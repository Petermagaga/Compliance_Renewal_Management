
from twilio.rest import Client
from django.conf import settings

from notifications.services.providers import NotificationProvider


class WhatsAppProvider(NotificationProvider):

    def send(self, notification):

        body = f"""
{notification.title}

{notification.message}
"""

        try:

            Client.messages.create(
                body=body,
                from_=f"whatsapp:{settings.TWILIO_WHATSAPP_NUMBER}",
                to=f"whatsapp:{notification.recipient.phone}",
            )

            return True

        except Exception as exc:
            print(exc)
            return False