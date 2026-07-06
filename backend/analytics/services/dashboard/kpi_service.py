from datetime import timedelta

from django.db.models import Count
from django.utils import timezone

from compliance.models import ComplianceItem


class KPIService:
    """
    Builds all KPI metrics required by the dashboard.
    """

    EXPIRING_THRESHOLD_DAYS = 60
    CRITICAL_THRESHOLD_DAYS = 7

    def __init__(self, company=None):
        self.company = company
        self.today = timezone.now().date()

    def _queryset(self):
        qs = ComplianceItem.objects.all()

        if self.company:
            qs = qs.filter(company=self.company)

        return qs

    def get_summary(self):
        qs = self._queryset()

        total = qs.count()

        expired = qs.filter(
            expiry_date__lt=self.today
        ).count()

        expiring = qs.filter(
            expiry_date__gte=self.today,
            expiry_date__lte=self.today + timedelta(days=self.EXPIRING_THRESHOLD_DAYS)
        ).count()

        active = qs.filter(
            expiry_date__gt=self.today + timedelta(days=self.EXPIRING_THRESHOLD_DAYS)
        ).count()

        critical = qs.filter(
            expiry_date__gte=self.today,
            expiry_date__lte=self.today + timedelta(days=self.CRITICAL_THRESHOLD_DAYS)
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