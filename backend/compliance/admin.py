from django.contrib import admin
from .models import ComplianceItem,ReminderLog

admin.site.register(ComplianceItem)
admin.site.register(ReminderLog)
