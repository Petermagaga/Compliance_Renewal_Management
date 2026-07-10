import uuid
from django.db import models
class TimeStampedModel(models.Model):
    """
    Adds automatic timestamp tracking

    """

    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    class Meta:
        abstract=True


class UUIDModel(models.Model):
    """
    Uses UUID as primary Key
    """
    id=models.UUIDField(primary_key=True,default=uuid.uuid4,
                        editable=False
                        )
    class Meta:
        abstract=True


class BaseModel(UUIDModel,TimeStampedModel):
    """
    Base model inherited by every business model
    """
    class Meta:
        abstract=True
        