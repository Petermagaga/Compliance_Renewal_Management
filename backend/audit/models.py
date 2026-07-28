from django.conf import settings

from django.db import models

class AuditEntry(models.Model):
    actor=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.SET_NULL,
                            null=True,blank=True)
    event_type=models.CharField(max_length=100)

    entity_type=models.CharField(max_length=100)
    entity_id=models.PositiveIntegerField()
    previous_state=models.JSONField(default=dict,)
    new_state=models.JSONField(default=dict)
    metadata=models.JSONField(
        
        default=dict,
        blank=True
    )

    occurred_at=models.DateTimeField(
        auto_now_add=True

    )

    class Meta:
        ordering=[
            "-occurred_at"
        ]
    
    def __str__(self):
        return (
            f"{self.event_type}"
        )
    
class DomainEventRecord(models.Model):

    event_name = models.CharField(
        max_length=200,
    )

    aggregate_type = models.CharField(
        max_length=100,
    )

    aggregate_id = models.PositiveIntegerField()

    payload = models.JSONField()

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    processed = models.BooleanField(
        default=False,
    )

    class Meta:

        ordering = [
            "-created_at"
        ]



class Activity(models.Model):

    ACTIVITY_TYPES = [

        ("created", "Created"),

        ("updated", "Updated"),

        ("deleted", "Deleted"),

        ("email_sent", "Email Sent"),

        ("whatsapp_sent", "WhatsApp Sent"),

        ("renewed", "Renewed"),

        ("expired", "Expired"),

    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    activity_type = models.CharField(
        max_length=30,
        choices=ACTIVITY_TYPES,
    )

    title = models.CharField(max_length=255)

    description = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title