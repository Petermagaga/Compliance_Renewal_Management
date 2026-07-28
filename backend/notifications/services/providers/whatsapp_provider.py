from authentication.models import User
from compliance.models import ComplianceItem
from notifications.models import Notification
from notifications.services.providers.whatsapp_provider import WhatsAppProvider

user = User.objects.first()
item = ComplianceItem.objects.first()

notification = Notification.objects.create(
    recipient=user,
    title="Compliance Reminder",
    message=f"{item.name} expires soon.",
    channel="whatsapp",
    status="pending",
    metadata={
        "compliance_item_id": item.id,
        "item_name": item.name,
        "category": item.category,
        "expiry_date": str(item.expiry_date),
        "days_remaining": 4,
    }
)

WhatsAppProvider().send(notification)