from twilio.rest import Client
from django.conf import settings
from __init__  import NotificationProvider


client = Client(
    settings.TWILIO_ACCOUNT_SID,
    settings.TWILIO_AUTH_TOKEN
)


def send_whatsapp_notification(item, days_left):

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

    try:

        message = client.messages.create(
            body=message_body,
            from_=settings.TWILIO_WHATSAPP_NUMBER,
            to=settings.TWILIO_TEST_RECIPIENT
        )

        print(f"WhatsApp sent successfully.")
        print(f"Message SID: {message.sid}")

        return True

    except Exception as e:

        print("Failed to send WhatsApp message.")
        print(e)

        return False
    

class WhatsAppProvider(NotificationProvider):
    def send(self,notification):

        """
        """