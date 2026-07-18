from notifications.models import Notification
from notifications.services.registry import PROVIDERS
from time import timezone

class NotificationService:
    """
    Central service responsible for creating and
    delivering notifications
    """

    @staticmethod
    def send(*,recipient,
             title,
             message,
             channel,
             metadata=None):
        notification=Notification.objects.create(
            recipient=recipient,
            title=title,
            message=message,
            channel=channel,
            metadata=metadata or {},
        )

        provider=PROVIDERS.get(channel)

        if provider is None:
            notification.status = "failed"
            notification.save(update_fields=["status"])
            return notification
        
        success=provider.send(notification)

        if success:
            notification.status ="sent"
            notification.sent_at=timezone.now()

        else:
            notification.status ="failed"
        
        notification.save(
            update_fields=[
                "status",
                "sent_at",
            ]
        )
        return notification

    @staticmethod
    def send_compliance_reminder(*,recipient,item,days_left,channel,):
        return NotificationService.send(
            recipient=recipient,
            title="Compliance Reminder",
            message=f"{item.name} expires in {days_left} days.",
            channel=channel,
            metadata={
                "compliance_item_id":item.id,
                "item_name":item.name,
                "category":item.category,
                "expiry_date":item.expiry_date,
                "days_remaining":days_left,
            },
        )