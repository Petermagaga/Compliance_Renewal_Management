from datetime import date

from compliance.models import ComplianceItem


def get_upcoming_reminders():

    today = date.today()

    items = (
        ComplianceItem.objects
        .select_related("department")
        .filter(
            expiry_date__isnull=False,
        )
        .order_by("expiry_date")
    )

    reminders = []

    for item in items:

        days_remaining = (
            item.expiry_date - today
        ).days

        # Ignore items that are more than
        # 90 days away.
        if days_remaining > 90:
            continue

        # Ignore already-renewed items.
        if item.status == "renewed":
            continue

        if days_remaining <= 7:
            priority = "Critical"

        elif days_remaining <= 30:
            priority = "High"

        elif days_remaining <= 60:
            priority = "Medium"

        else:
            priority = "Low"

        reminders.append({
            "id": item.id,
            "name": item.name,
            "category": item.category,
            "department": (
                item.department.name
                if item.department
                else None
            ),
            "responsible_person": item.responsible_person,
            "expiry_date": item.expiry_date,
            "days_remaining": days_remaining,
            "priority": priority,
        })

    return reminders