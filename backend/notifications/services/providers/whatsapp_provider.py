from twilio.rest import Client
from django.conf import settings

from notifications.services.providers import NotificationProvider


client = Client(
    settings.TWILIO_ACCOUNT_SID,
    settings.TWILIO_AUTH_TOKEN,
)


class WhatsAppProvider(NotificationProvider):

    def send(self, notification):

        body = f"""
{notification.title}

{notification.message}
"""

        try:

            client.messages.create(
                body=body,
                from_=settings.TWILIO_WHATSAPP_NUMBER,
                to=notification.recipient.phone_number,
            )

            return True

        except Exception:
            return False