from notifications.models import Notification
from notifications.services.registry import PROVIDERS


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
        raise NotImplementedError