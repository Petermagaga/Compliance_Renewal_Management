from audit.models import AuditEntry,DomainEventRecord

from audit.models import Activity

class AuditService:
    @staticmethod
    def record(actor,event_type,entity,previous_state=None,
               new_state=None,metadata=None):
        
        return AuditEntry.objects.create(
            actor=actor,
            event_type=event_type,
            entity_type=entity.__class__.__name__,
            entity_id=entity.pk,
            previous_state=previous_state or {},
            new_state=new_state or {},
            metadata=metadata or {},
        )
    



class EventStoreService:

    @staticmethod
    def append(

        event_name,

        aggregate,

        payload,

    ):

        return DomainEventRecord.objects.create(

            event_name=event_name,

            aggregate_type=aggregate.__class__.__name__,

            aggregate_id=aggregate.pk,

            payload=payload,

        )



class ActivityService:

    @staticmethod
    def log(
        *,
        activity_type,
        title,
        description,
        compliance_item=None,
        user=None,
    ):

        Activity.objects.create(

            user=user,
            compliance_item=compliance_item,
            activity_type=activity_type,

            title=title,

            description=description,

        )

