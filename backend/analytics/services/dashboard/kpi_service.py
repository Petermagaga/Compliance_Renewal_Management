from datetime import timedelta
from analytics.config import EXPIRING_DAYS, CRITICAL_DAYS

from django.db.models import Count
from django.utils import timezone
from .base import BaseAnalyticsService
from compliance.models import ComplianceItem


class KPIService(BaseAnalyticsService):
    """
    Builds all KPI metrics required by the dashboard.
    """
    def get_summary(self):
        qs = self.queryset

        total = qs.count()

        expired = qs.filter(
            expiry_date__lt=self.today
        ).count()

        expiring = qs.filter(
            expiry_date__gte=self.today,
            expiry_date__lte=self.today + timedelta(days=EXPIRING_DAYS)
        ).count()

        active = qs.filter(
            expiry_date__gt=self.today + timedelta(days=EXPIRING_DAYS)
        ).count()

        critical = qs.filter(
            expiry_date__gte=self.today,
            expiry_date__lte=self.today + timedelta(days=CRITICAL_DAYS)
        ).count()

        compliance_health = (
            round((active / total) * 100, 1)
            if total
            else 100.0
        )

        return {
            "total_items": total,
            "active": active,
            "expiring": expiring,
            "expired": expired,
            "critical": critical,
            "compliance_health": compliance_health,
        }