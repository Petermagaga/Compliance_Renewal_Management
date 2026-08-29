from django.conf import settings
from django.core.mail import EmailMultiAlternatives
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
            "dashboard_url": "https://frontpage-gnzt.onrender.com/",
            "logo_url": (
                "https://res.cloudinary.com/cz2q5slp/image/upload/"
                "f_auto,q_auto/logo_jiuujm"
            ),
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

            email = EmailMultiAlternatives(
                subject=notification.title,
                body=text,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[notification.recipient.email],
            )

            email.attach_alternative(
                html,
                "text/html",
            )

            email.send(
                fail_silently=False
            )

            return True

        except Exception as exc:

            print("========== EMAIL ERROR ==========")
            print(exc)

            return False


        
