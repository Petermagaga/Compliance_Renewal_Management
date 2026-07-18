from notifications.models import Notification

class NotificationSelector:

    @staticmethod
    def for_user(user):
        return Notification.objects.filter(
            recipient=user
        ).order_by("-created_at")
    
    @staticmethod
    def unread(user):
        return Notification.objects.filter(
            recipient=user,
            is_read=False
        )
    
    @staticmethod
    def unread_count(user):
        return Notification.objects.filter(
            recipient=user,
            is_read=False
        ).count()
    
    
    
    
