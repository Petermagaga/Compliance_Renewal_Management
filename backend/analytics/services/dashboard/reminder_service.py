from datetime import timedelta
from analytics.config import EXPIRING_DAYS, CRITICAL_DAYS

from .base import BaseAnalyticsService


class ReminderService(BaseAnalyticsService):
    """
    Builds reminder intelligence for the dashboard
    and future notification services.
    """

    def upcoming(self, limit=5):
        """
        Next compliance items that require attention.
        """

        qs = (
            self.queryset
            .filter(
                expiry_date__gte=self.today,
                expiry_date__lte=self.today + timedelta(days=EXPIRING_DAYS)
            )
            .order_by("expiry_date")[:limit]
        )

        reminders = []

        for item in qs:

            days_remaining = (item.expiry_date - self.today).days

            reminders.append({
                "id": item.id,
                "name": item.name,
                "category": item.category,
                "department": item.department.name,
                "responsible_person": item.responsible_person,
                "expiry_date": item.expiry_date,
                "days_remaining": days_remaining,
                "priority": self.calculate_priority(days_remaining),
            })

        return reminders
    
    def critical(self):
        """
        Compliance items expiring within 7 days.
        """

        qs = self.queryset.filter(
            expiry_date__gte=self.today,
            expiry_date__lte=self.today + timedelta(days=CRITICAL_DAYS)
        )

        return qs.count()

    @staticmethod
    def calculate_priority(days):
        """
        Converts days remaining into business priority.
        """

        if days <= 7:
            return "Critical"

        if days <= 30:
            return "High"

        if days <= 60:
            return "Medium"

        return "Low"
