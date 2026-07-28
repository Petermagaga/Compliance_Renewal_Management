from audit.models import AuditEntry,DomainEventRecord

class AuditService:
    @staticmethod
    def record(actor,event_type,entity,previous_state,
               new_state,metadata=None):
        
        return AuditEntry.objects.create(
            actor=actor,
            event_type=event_type,
            entity_type=entity.__class__.__name__,
            entity_id=entity.pk,
            previous_state=previous_state,
            new_state=new_state,
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


