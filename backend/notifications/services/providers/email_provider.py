from django.template.loader import render_to_string
from __init__  import NotificationProvider
from django.conf import settings

import resend

resend.api_key = settings.RESEND_API_KEY

def send_expiry_email(item, days_left):

    context = {
        "item": item,
        "days_left": days_left,
        "logo_url": "https://yourdomain.com/static/images/logo.png",
        "dashboard_url": "https://yourdomain.com/dashboard/",
    }

    html = render_to_string(
        "emails/compliance_reminder.html",
        context
    )

    text = render_to_string(
        "emails/compliance_reminder.txt",
        context
    )

    resend.Emails.send({
        "from": "Compliance System <onboarding@resend.dev>",
        "to": [item.company.email],
        "subject": f"Compliance Reminder - {item.name}",
        "html": html,
        "text": text,
    })


class EmailProvider(NotificationProvider):

    def send(self,notification):
            
        """
        
        """

