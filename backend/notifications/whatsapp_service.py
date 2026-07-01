from twilio.rest import Client
from django.conf import settings

client= Client(
    settings.TWILIO_ACCOUNT_SID,
    settings.TWILIO_AUTH_TOKEN
)

def sent_whatsapp_notification(item,days_left):

    message_body = f"""
    🔔 COMPLIANCE REMINDER

    Hello,

    Your compliance item is approaching its expiry date.

    ━━━━━━━━━━━━━━━━━━

    📄 Item:
    {item.name}

    📂 Category:
    {item.category}

    👤 Responsible:
    {item.responsible_person}

    📅 Expiry Date:
    {item.expiry_date}

    ⏳ Days Remaining:
    {days_left}

    ━━━━━━━━━━━━━━━━━━

    Please renew this compliance item before the expiry date.

    Compliance Management System
    """