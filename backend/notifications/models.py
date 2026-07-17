from django.db import models
from config.settings import

class Notification(models.Model):
    recipient=models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,related_name="notifications"
    )

    title=models.CharField(max_length=255)
    message=models.TextField()
    channel=models.CharField(max_length=255)
    status=models.CharField(max_length=255)
    is_read=models.BooleanField(default=False)
    created_at=models.DateTimeField(auto_now_add=True)

    
