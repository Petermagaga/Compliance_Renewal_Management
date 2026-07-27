from django.conf import settings
from django.template.loader import render_to_string

import resend

from notifications.services.providers import NotificationProvider

resend.api_key = settings.RESEND_API_KEY


class EmailProvider(NotificationProvider):

    def send(self, notification):

        context = {
            "title": notification.title,
            "message": notification.message,
            "recipient": notification.recipient,
  
        }

        html = render_to_string(
            "emails/notification.html",
            context,
        )

        text = render_to_string(
            "emails/notification.txt",
            context,
        )

        try:

            resend.Emails.send({
                "from": "Compliance System <onboarding@resend.dev>",
                "to": [notification.recipient.email],
                "subject": notification.title,
                "html": html,
                "text": text,
            })

            return True

        except Exception as exc:
            print(f"Error sending email: {exc}")
            return False