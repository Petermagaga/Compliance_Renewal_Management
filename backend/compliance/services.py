from datetime import date
from .models import ComplianceItem,ReminderLog
from notifications.services.providers import email_provider

REMINDER_DAYS= [90,60,30,14,7,1]


def update_compliance_status():
    items=ComplianceItem.objects.all()


    for item in items:
        days_left=(item.expiry_date - date.today()).days


        if days_left<=0:
            item.status = "expired"

        elif days_left<=60:
            item.status= "expiring"
        else:
            item.status="active"

        
        item.save()



def get_items_needing_reminders():

    items=ComplianceItem.objects.all()
    items_to_notify=[]

    for item in items:
        days_left=(item.expiry_date - date.today()).days

        if days_left in REMINDER_DAYS:
            already_sent=ReminderLog.objects.filter(
                compliance_item=item,
                days_before=days_left
            ).exists()


            if not already_sent:
                items_to_notify.append(item)


    return items_to_notify


def process_reminders():
    items=ComplianceItem.objects.all()

    for item in items:
        days_left=(item.expiry_date -date.today()).days

        if days_left in REMINDER_DAYS:
            already_sent=ReminderLog.objects.filter(
                compliance_item=item,
                days_before=days_left,
                channel="email"
            ).exists()

            if not already_sent:
                email_provider(item,days_left)

                ReminderLog.objects.create(
                    compliance_item=item,
                    days_before=days_left,
                    channel="email",
                    status="sent"
                )