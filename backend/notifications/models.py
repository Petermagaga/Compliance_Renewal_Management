from django.db import models
from django.conf import settings
CHANNEL_CHOICES = [
    ("email", "Email"),
    ("whatsapp", "WhatsApp"),
    ("in_app", "In App"),
]


STATUS_CHOICES = [
    ("pending", "Pending"),
    ("sent", "Sent"),
    ("failed", "Failed"),
    ("read", "Read"),
]

class Notification(models.Model):
    recipient=models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,related_name="notifications"
    )

    title=models.CharField(max_length=255)
    message=models.TextField()
    channel=models.CharField(max_length=25,choices=CHANNEL_CHOICES)
    metadata=models.JSONField(default=dict,blank=True)
    status=models.CharField(max_length=25,choices=STATUS_CHOICES)
    is_read=models.BooleanField(default=False)
    sent_at=models.DateTimeField(null=True,blank=True)
    created_at=models.DateTimeField(auto_now_add=True)

    class Meta:

        ordering=["-created_at"]
    
    
    def __str__(self):
        return f"{self.title} ({self.channel})"
    




