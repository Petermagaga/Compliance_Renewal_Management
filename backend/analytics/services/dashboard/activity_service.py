from compliance.models import ReminderLog
from audit.models import Activity

from .base import BaseAnalyticsService

class ActivityService(BaseAnalyticsService):
    """
    Builds a unified business activity timeline.
    """


    def recent_items(self, limit=5):
        activities = []

        # Recently created compliance items.
        # self.queryset should already be filtered by company in BaseAnalyticsService.
        items = (
            self.queryset
            .select_related("department")
            .order_by("-created_at")[:limit]
        )

        for item in items:
            activities.append({
                "type": "created",
                "title": f"{item.name} created",
                "description": f"Department: {item.department.name}",
                "timestamp": item.created_at,
            })

        # Apply filters before ordering and slicing.
        reminders = ReminderLog.objects.select_related(
            "compliance_item"
        )

        if self.company:
            reminders = reminders.filter(
                compliance_item__company=self.company
            )

        reminders = reminders.order_by("-sent_at")[:limit]

        for reminder in reminders:
            activities.append({
                "type": "reminder",
                "title": f"{reminder.channel.title()} reminder sent",
                "description": reminder.compliance_item.name,
                "timestamp": reminder.sent_at,
            })

        # Merge both activity types and return the newest entries.
        activities.sort(
            key=lambda activity: activity["timestamp"],
            reverse=True,
        )

        return activities[:limit]
    @staticmethod
    def log(*,activity_type,title,description,user=None,compliane_item=None):

        Activity.objects.create(
            user=user,
            activity_type=activity_type,
            title=title,
            description=description,
            compliane_item=compliane_item
        )
