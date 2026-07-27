from django.conf import settings
from django.template.loader import render_to_string

import resend

from notifications.services.providers import NotificationProvider

resend.api_key = settings.RESEND_API_KEY


class EmailProvider(NotificationProvider):

    def send(self, notification,item=None,days_remaining=None):

        print("========== EMAIL PROVIDER ==========")
        print(notification.recipient.email)
        print(notification.title)

        context = {
            "title": notification.title,
            "message": notification.message,
            "recipient": notification.recipient,
            "item": item,
            "days_remaining": days_remaining,
            "dashboard_url": "https://frontpage-gnzt.onrender.com/",
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

            response = resend.Emails.send({
                "from": "Compliance System <onboarding@resend.dev>",
                "to": [notification.recipient.email],
                "subject": notification.title,
                "html": html,
                "text": text,
            })

            print(response)

            return True

        except Exception as exc:

            print("EMAIL ERROR")
            print(exc)

            return False