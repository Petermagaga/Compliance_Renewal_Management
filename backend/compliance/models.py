from django.db import models
from accounts.models import Company,Department
from compliance.domain.statuses import ComplianceStatus
from django.conf import settings

CATEGORY_CHOICES=[
    ('license','License'),
    ('permit','Permit'),
    ('insurance','Insurance'),
    ('certificate','Certificate'),
    ('contract','Contract'),
]

CHANNEL_CHOICES=[
    ("email","Email"),
    ("whatsapp",'WhatApp'),
]


PRIORITY_CHOICES=[
    ("low","Low"),
    ('medium','Medium'),
    ('high','High'),
    ('critical','Critical'),
]

class ComplianceItem(models.Model):
    company=models.ForeignKey(Company,on_delete=models.CASCADE,related_name="compliance_items")
    department=models.ForeignKey(Department,on_delete=models.CASCADE,related_name='compliance_items')
    name=models.CharField(max_length=255)
    category=models.CharField(choices=CATEGORY_CHOICES,max_length=50)
    issue_date=models.DateField()
    expiry_date=models.DateField()

    priority = models.CharField(
        max_length=20,
        choices=PRIORITY_CHOICES,
        default="medium",
    )
    responsible_person = models.CharField(max_length=255)
    status=models.CharField(max_length=50,
                            choices=ComplianceStatus.choices(),
                            default=ComplianceStatus.DRAFT)
    document=models.FileField(upload_to='compliance_docs',blank=True,null=True)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class ReminderLog(models.Model):
    compliance_item=models.ForeignKey(ComplianceItem,on_delete=models.CASCADE,
                                      related_name="reminder_logs")
    
    days_before=models.IntegerField()
    channel=models.CharField(max_length=50,choices=CHANNEL_CHOICES)
    sent_at=models.DateTimeField(auto_now_add=True)
    status=models.CharField(max_length=50,default="sent")

    def __str__(self):
        return f"{self.compliance_item.name} -{self.channel}"


class ComplianceRenewal(models.Model):
    compliance_item=models.ForeignKey(
        ComplianceItem,on_delete=models.CASCADE,related_name="renewals",
    )
    old_issue_date=models.DateField()
    old_expiry_date=models.DateField()

    new_issue_date=models.DateField()
    new_expiry_date =models.DateField()

    old_daocument=models.FileField(
        upload_to="compliance_renewals/old/",blank=True,null=True,
    )

    new_document=models.FileField(
        upload_to="compliance_renewals/new/",blank=True,null=True
    )

    renewed_by=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.SET_NULL,
                                 null=True,blank=True,related_name="compliance_renewals",)
    def __str__(self):
        return (
            f"{self.compliance_item.name}"
            f"renewed on {self.renewed_at.date()}"
        )
    
    
