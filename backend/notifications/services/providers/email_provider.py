from django.conf import settings
from django.template.loader import render_to_string

import resend

from compliance.models import ComplianceItem
from notifications.services.providers import NotificationProvider

resend.api_key = settings.RESEND_API_KEY


class EmailProvider(NotificationProvider):

    def send(self, notification):

        metadata = notification.metadata or {}

        item = None

        if metadata.get("compliance_item_id"):
            item=ComplianceItem.objects.get(
                id=metadata["compliance_item_id"]
            )

        context = {
            "title": notification.title,
            "message": notification.message,
            "recipient": notification.recipient,
            "item": item,
            "days_left": metadata.get("days_remaining"),
            "dashboard_url": "https://frontpage-gnzt.onrender.com/",
            "logo_url":"https://res.cloudinary.com/cz2q5slp/image/upload/f_auto,q_auto/logo_jiuujm"
        }

        print(metadata)
        print(item)
        print(metadata.get("days_remaining"))
        

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

            print(exc)

            return False