import requests

from django.conf import settings
from django.template.loader import render_to_string

from compliance.models import ComplianceItem
from notifications.services.providers import NotificationProvider


class EmailProvider(NotificationProvider):

    def send(self, notification):

        metadata = notification.metadata or {}

        item = None

        if metadata.get("compliance_item_id"):
            item = ComplianceItem.objects.get(
                id=metadata["compliance_item_id"]
            )

        context = {
            "title": notification.title,
            "message": notification.message,
            "recipient": notification.recipient,
            "item": item,
            "days_left": metadata.get("days_remaining"),
            "dashboard_url": "https://compliance-renewal-management.vercel.app/",
            "logo_url": (
                "https://res.cloudinary.com/cz2q5slp/image/upload/"
                "f_auto,q_auto/logo_jiuujm"
            ),
        }

        html = render_to_string(
            "emails/notification.html",
            context,
        )

        text = render_to_string(
            "emails/notification.txt",
            context,
        )

        payload = {
            "sender": {
                "name": settings.BREVO_SENDER_NAME,
                "email": settings.BREVO_SENDER_EMAIL,
            },
            "to": [
                {
                    "email": notification.recipient.email,
                    "name": notification.recipient.full_name,
                }
            ],
            "subject": notification.title,
            "htmlContent": html,
            "textContent": text,
        }

        headers = {
            "accept": "application/json",
            "api-key": settings.BREVO_API_KEY,
            "content-type": "application/json",
        }

        try:

            response = requests.post(
                "https://api.brevo.com/v3/smtp/email",
                headers=headers,
                json=payload,
                timeout=15,
            )

            print("========== BREVO EMAIL ==========")
            print("Status:", response.status_code)
            print("Response:", response.text)

            response.raise_for_status()

            return True

        except requests.RequestException as exc:

            print("========== BREVO EMAIL ERROR ==========")
            print(exc)

            return False