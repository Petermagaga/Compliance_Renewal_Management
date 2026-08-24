from django.conf import settings
from twilio.rest import Client

from notifications.services.providers import NotificationProvider


class WhatsAppProvider(NotificationProvider):

    def __init__(self):
        self.client = Client(
            settings.TWILIO_ACCOUNT_SID,
            settings.TWILIO_AUTH_TOKEN,
        )

    def send(self, notification):

        metadata = notification.metadata or {}

        print("========== WHATSAPP PROVIDER ==========")
        print("Recipient:", notification.recipient.normalized_phone)
        print("Item:", metadata.get("item_name"))
        print("Days:", metadata.get("days_remaining"))

        body = (
            "🔔 Compliance Reminder\n\n"
            f"Item: {metadata.get('item_name')}\n"
            f"Category: {metadata.get('category')}\n"
            f"Expiry Date: {metadata.get('expiry_date')}\n"
            f"Days Remaining: {metadata.get('days_remaining')} day(s)\n\n"
            "Please renew this compliance item before expiry.\n\n"
            "Compliance Renewal Management System"
        )

        try:

            message = self.client.messages.create(
                body=body,
                from_=settings.TWILIO_WHATSAPP_NUMBER,
                to=f"whatsapp:{notification.recipient.normalized_phone}",
            )

            print("WhatsApp SID:", message.sid)

            return True

        except Exception as exc:

            print("========== WHATSAPP ERROR ==========")
            print(exc)

            return False