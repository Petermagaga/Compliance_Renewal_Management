from django.db import models
from cores.models import BaseModel
from django.conf import settings

class Company(BaseModel):
    name=models.CharField(max_length=255)
    email=models.EmailField()
    phone=models.CharField( max_length=50,blank=True,null=True)
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Department(BaseModel):
    company=models.ForeignKey(Company,on_delete=models.CASCADE, related_name="departments")
    name=models.CharField(max_length=255)
    manager_name=models.CharField(max_length=255)
    manager_email=models.EmailField()

    def __str__(self):
        return f"{self.name} -{self.company.name}"
    

class NotificationPreference(BaseModel):
    user=models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
                              related_name="notification_preferences",)

    email_enabled=models.BooleanField(default=True)
    whatsapp_enabled=models.BooleanField(default=True)

    def __str__(self):
        return f"Notification preferences - {self.user.email}"
    