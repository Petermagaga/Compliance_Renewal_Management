from datetime import datetime
from django.utils import timezone
from  compliance.models import ComplianceItem
from compliance.domain.events.compliance_events import (ComplianceExpired,)
from compliance.domain.events.dispatcher import (dispatcher)
from compliance.domain.statuses import ComplianceStatus
from compliance.domain.transitions import ALLOWED_TRANSITIONS
from audit.services import AuditService,EventStoreService,ActivityService
from compliance.domain.exceptions import InvalidTransitionError



class LifecycleService:
    """
    Controls every lifecycle transition.
    No code Should update Compliancestatus directly
    """
    @staticmethod
    def can_transition(current_status,target_status):

        """
        Returns True if the transition is allowed
        """

        allowed=ALLOWED_TRANSITIONS.get(
            current_status,set()
        )

        return target_status in allowed
    
    @staticmethod
    def validate_transition(current_status,target_status):
        if not LifecycleService.can_transition(current_status,target_status):
            raise InvalidTransitionError(
                f"Cannot transition"
                f"from {current_status.value}"
                f"to {target_status.value}."
            )
    @staticmethod
    def transition(item,target_status,actor=None):
        """
        Perform a lifecyle transition.
        this is the Only supported way to change status.

        """
        current = ComplianceStatus(item.status)

        LifecycleService.validate_transition(
            current,target_status,
        )

        item.status=target_status.value

        item.save(
            update_fields=[
                "status",
                "updated_at"
            ]
        )

        ActivityService.log(
            activity_type="updated",
            title="Compliance Status Changed",
            description=(
                f"{item.name} changed to "
                f"{target_status.name.replace('_', ' ').title()}."
            ),
            compliance_item=item,
            user=actor,
        )


        if target_status == ComplianceStatus.EXPIRED:
            dispatcher.dispatch(
                ComplianceExpired(
                    compliance_item=item,
                    actor=actor,
                    occurred_at=datetime.now(),
                )
            )
        return item


    @staticmethod
    def submit(item, actor=None):
        return LifecycleService.transition(
            item,
            ComplianceStatus.UNDER_REVIEW,
            actor,
        )

    @staticmethod
    def approve(item, actor=None):
        return LifecycleService.transition(
            item,
            ComplianceStatus.APPROVED,
            actor,
        )

    @staticmethod
    def activate(item, actor=None):
        return LifecycleService.transition(
            item,
            ComplianceStatus.ACTIVE,
            actor,
        )
    

    @staticmethod
    def mark_expiring(item, actor=None):
        return LifecycleService.transition(
            item,
            ComplianceStatus.EXPIRING,
            actor,
        )

    @staticmethod
    def expire(item, actor=None):
        return LifecycleService.transition(
            item,
            ComplianceStatus.EXPIRED,
            actor,
        )

    @staticmethod
    def archive(item, actor=None):
        return LifecycleService.transition(
            item,
            ComplianceStatus.ARCHIVED,
            actor,
        )

    def audit_handler(event):

        AuditService.record(

            actor=event.actor,

            event_type=type(event).__name__,

            entity=event.compliance_item,

            previous_state={

                "status": "previous"

            },

            new_state={

                "status": event.compliance_item.status

            },

        )


    def store_event(event):

        EventStoreService.append(

            event_name=type(event).__name__,

            aggregate=event.compliance_item,

            payload={

                "status":

                event.compliance_item.status,

                "actor":

                getattr(event.actor, "id", None),

            },

        )

    @staticmethod
    def process_expirations(actor=None):
        """
        Automatically updates compliance items based on expiry date.

        ACTIVE -> EXPIRING
        EXPIRING -> EXPIRED
        """

        today = timezone.now().date()

        items_processed = 0
        items_expiring = 0
        items_expired = 0

        items = ComplianceItem.objects.filter(
            status__in=[
                ComplianceStatus.ACTIVE.value,
                ComplianceStatus.EXPIRING.value,
            ]
        )

        for item in items:

            days_remaining = (item.expiry_date - today).days
            # ACTIVE -> EXPIRED
            if (
                item.status == ComplianceStatus.ACTIVE.value
                and days_remaining < 0
            ):
                LifecycleService.expire(
                    item,
                    actor=actor,
                )

                items_expired += 1
                items_processed += 1

            # ACTIVE -> EXPIRING
            elif (
                item.status == ComplianceStatus.ACTIVE.value
                and 0 <= days_remaining <= 30
            ):
                LifecycleService.mark_expiring(
                    item,
                    actor=actor,
                )

                items_expiring += 1
                items_processed += 1

            # EXPIRING -> EXPIRED
            elif (
                item.status == ComplianceStatus.EXPIRING.value
                and days_remaining < 0
            ):
                LifecycleService.expire(
                    item,
                    actor=actor,
                )

                items_expired += 1

                items_processed += 1



        return {
                "processed": items_processed,
                "expiring": items_expiring,
                "expired": items_expired,
        }

    @staticmethod
    def start_renewal(item,actor=None):
        return LifecycleService.transition(
            item,
            ComplianceStatus.RENEWAL_IN_PROGRESS,
            actor,
        )
    @staticmethod
    def complete_renewal(item,actor=None):
        return LifecycleService.transition(
            item,
            ComplianceStatus.ACTIVE,
            actor,
        )

    