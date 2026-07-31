from django.utils import timezone

from audit.services import ActivityService
from notifications.models import Notification
from notifications.services.registry import PROVIDERS


class NotificationService:

    @staticmethod
    def send(
        *,
        recipient,
        title,
        message,
        channel,
        metadata=None,
    ):
        notification = Notification.objects.create(
            recipient=recipient,
            title=title,
            message=message,
            channel=channel,
            status="pending",
            metadata=metadata or {},
        )

        provider = PROVIDERS.get(channel)

        if provider is None:
            notification.status = "failed"
            notification.save(update_fields=["status"])
            return notification

        success = provider.send(notification)

        if success:
            notification.status = "sent"
            notification.sent_at = timezone.now()

            ActivityService.log(
                activity_type=f"{channel}_sent",
                title=f"{channel.title()} Reminder Sent",
                description=notification.message,
                user=recipient,
            )

        else:
            notification.status = "failed"

            ActivityService.log(
                activity_type=f"{channel}_failed",
                title=f"{channel.title()} Reminder Failed",
                description=notification.message,
                user=recipient,
            )

        notification.save(
            update_fields=[
                "status",
                "sent_at",
            ]
        )

        return notification

    @staticmethod
    def send_compliance_reminder(
        *,
        recipient,
        item,
        days_left,
        channel,
    ):
        metadata = {
            "compliance_item_id": item.id,
            "item_name": item.name,
            "category": item.category,
            "expiry_date": str(item.expiry_date),
            "days_remaining": days_left,
        }

        existing = Notification.objects.filter(
            recipient=recipient,
            channel=channel,
            metadata__compliance_item_id=item.id,
            metadata__days_remaining=days_left,
        ).order_by("-created_at").first()

        # Already successfully delivered
        if existing and existing.status == "sent":
            return existing

        # Failed notifications can be retried
        if existing and existing.status == "failed":
            notification = existing
        else:
            notification = Notification.objects.create(
                recipient=recipient,
                title="Compliance Reminder",
                message=(
                    f"{item.name} expires "
                    f"in {days_left} day(s)."
                ),
                channel=channel,
                status="pending",
                metadata=metadata,
            )

        provider = PROVIDERS.get(channel)

        if provider is None:
            notification.status = "failed"
            notification.save(update_fields=["status"])
            return notification

        success = provider.send(notification)

        if success:
            notification.status = "sent"
            notification.sent_at = timezone.now()

            ActivityService.log(
                activity_type=f"{channel}_sent",
                title=f"{channel.title()} Reminder Sent",
                description=notification.message,
                user=recipient,
            )

        else:
            notification.status = "failed"

            ActivityService.log(
                activity_type=f"{channel}_failed",
                title=f"{channel.title()} Reminder Failed",
                description=notification.message,
                user=recipient,
            )

        notification.save(
            update_fields=[
                "status",
                "sent_at",
            ]
        )

        return notification

    @staticmethod
    def mark_as_read(notification):
        if notification.is_read:
            return notification

        notification.is_read = True

        notification.save(
            update_fields=["is_read"]
        )

        return notification

    @staticmethod
    def mark_all_as_read(user):
        return Notification.objects.filter(
            recipient=user,
            is_read=False,
        ).update(
            is_read=True
        )