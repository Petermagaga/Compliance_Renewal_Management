from compliance.models import ComplianceItem, ReminderLog

from .base import BaseAnalyticsService


class ActivityService(BaseAnalyticsService):
    """
    Builds a unified business activity timeline.
    """

    def recent_items(self, limit=5):
        activities = []

        # Recently created compliance items
        items = (
            self.queryset
            .order_by("-created_at")[:limit]
        )

        for item in items:
            activities.append({
                "type": "created",
                "title": f"{item.name} created",
                "description": f"Department: {item.department.name}",
                "timestamp": item.created_at,
            })

        # Recent reminder logs
        reminders = (
            ReminderLog.objects
            .select_related("compliance_item")
            .order_by("-sent_at")[:limit]
        )

        if self.company:
            reminders = reminders.filter(
                compliance_item__company=self.company
            )

        for reminder in reminders:
            activities.append({
                "type": "reminder",
                "title": f"{reminder.channel.title()} reminder sent",
                "description": reminder.compliance_item.name,
                "timestamp": reminder.sent_at,
            })

        # Merge and sort newest first
        activities.sort(
            key=lambda activity: activity["timestamp"],
            reverse=True,
        )

        return activities[:limit]