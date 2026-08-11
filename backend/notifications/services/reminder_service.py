# notifications/services/reminder_service.py
from compliance.models import ComplianceItem, ReminderLog
from datetime import date
from notifications.models import Notification
from django.utils import timezone
from notifications.services.providers.email_provider import (EmailProvider)
from notifications.services.notification_service import NotificationService
from audit.services import AuditService,ActivityService

def format_expiry_message(item,days_left):
    if days_left==0:
        return f"{item.name} expires today,"

    if days_left==1:
        return f"{item.name} expires in 1 day. "

    return f"{item.name} expires  in {days_left} days."
    


REMINDER_DAYS = [

    90,

    60,

    30,

    14,

    7,
    4,
    3,
    2,
    1,

    0,

]

class ReminderService:

    """
    Coordinates reminder generation and delivery.

    Responsibilities

    - Find expiring items
    - Calculate days remaining
    - Create notifications
    - Send email
    - Send WhatsApp
    - Save reminder logs
    """
    def get_expiring_items(self):
        today=date.today()

        return ComplianceItem.objects.filter(
            expiry_date__gte=today,

            status__in=[
               "active",
               "expiring" 
            ]
        )


    def calculate_days_remaining(self,item):
        return(
            item.expiry_date - date.today()
        ).days


    def should_send(self,days_remaining):
        return days_remaining in REMINDER_DAYS

    


    def create_notifications(self, item, days_remaining):

        users = item.company.users.all()

        for user in users:

            channels= ["email"]

            if user.phone:
                channels.append("whatsapp")

            for channel in channels:
                
                NotificationService.send_compliance_reminder(
                    recipient=user,

                    item=item,

                    days_left=days_remaining,

                    channel=channel,
                )

                

        ReminderLog.objects.get_or_create(

            compliance_item=item,

            days_before=days_remaining,

            channel="email",

            defaults={

                "status": "sent" ,

            }

        )


    def run(self):

        items = self.get_expiring_items()

        for item in items:

            for item in items:
                days_left = self.calculate_days_remaining(item)

                if not self.should_send(days_left):
                    continue

                message=format_expiry_message(
                    item,days_left
                )

                print(message)

                self.create_notifications(
                    item,
                    days_left
                )
        