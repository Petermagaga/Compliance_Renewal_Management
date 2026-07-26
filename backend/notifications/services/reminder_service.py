# notifications/services/reminder_service.py
from compliance.models import ComplianceItem, ReminderLog
from datetime import date
from notifications.models import Notification
from django.utils import timezone

REMINDER_DAYS = [

    90,

    60,

    30,

    14,

    7,

    3,

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

            Notification.objects.get_or_create(

                recipient=user,

                title="Compliance Reminder",

                message=(
                    f"{item.name} expires in "
                    f"{days_remaining} day(s)."
                ),

                channel="in_app",

                status="pending",

                sent_at=timezone.now()

            )
        ReminderLog.objects.get_or_create(

            compliance_item=item,

            days_before=days_remaining,

            channel="in_app",

            defaults={

                "status": "sent"

            }

        )

    def run(self):

        items = self.get_expiring_items()

        for item in items:

            days = self.calculate_days_remaining(item)

            if self.should_send(days):

                print(
                    f"{item.name} expires in {days} days"
                )

                self.create_notifications(
                    item,
                    days
                )
        