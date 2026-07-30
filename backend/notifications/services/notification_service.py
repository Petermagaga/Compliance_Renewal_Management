from notifications.models import Notification
from notifications.services.registry import PROVIDERS
from notifications.queries.notification_selector import NotificationSelector
from django.utils import timezone
from audit.services import ActivityService
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
            status="pending",
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

            ActivityService.log(
                activity_type=f"{channel}_sent",
                title=f"{channel.title()} Reminder Sent",
                description=notification.message,
                user=recipient,
            )
            
        else:
            notification.status ="failed"

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
                "expiry_date":item.expiry_date.isoformat(),
                "days_remaining":days_left,
            },
        )
    
    @staticmethod
    def mark_as_read(notification):
        """
        Mark a single notification as read.
        """

        if notification.is_read:
            return notification

        notification.is_read = True
        notification.read_at = timezone.now()  # if you have this field
        notification.save(
            update_fields=["is_read", "read_at"]  # remove read_at if you don't have it
        )

        return notification

    @staticmethod
    def mark_all_as_read(user):
        """
        Mark all unread notifications for a user as read.
        """

        return NotificationSelector.unread(user).update(
            is_read=True,
            # read_at=timezone.now(),  # if your model has it
        )