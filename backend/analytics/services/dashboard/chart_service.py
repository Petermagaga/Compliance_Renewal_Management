from datetime import timedelta

from django.db.models import Count
from django.utils import timezone

from compliance.models import ComplianceItem


class ChartService:

    def __init__(self, company=None):
        self.company = company
        self.today = timezone.now().date()

    def _queryset(self):
        qs = ComplianceItem.objects.all()

        if self.company:
            qs = qs.filter(company=self.company)

        return qs

    def get_charts(self):
        return {
            "status_distribution": self.status_distribution(),
            "expiry_ranges": self.expiry_ranges(),
            "category_distribution": self.category_distribution(),
            "monthly_expiry_trend": self.monthly_expiry_trend(),
        }

    def status_distribution(self):
        qs = self._queryset()

        active = qs.filter(
            expiry_date__gt=self.today + timedelta(days=60)
        ).count()

        expiring = qs.filter(
            expiry_date__gte=self.today,
            expiry_date__lte=self.today + timedelta(days=60)
        ).count()

        expired = qs.filter(
            expiry_date__lt=self.today
        ).count()

        return [
            {"name": "Active", "value": active},
            {"name": "Expiring", "value": expiring},
            {"name": "Expired", "value": expired},
        ]

    def expiry_ranges(self):
        qs = self._queryset()

        buckets = [
            ("0-7", 0, 7),
            ("8-30", 8, 30),
            ("31-60", 31, 60),
            ("61-90", 61, 90),
        ]

        data = []

        for label, start, end in buckets:
            count = qs.filter(
                expiry_date__gte=self.today + timedelta(days=start),
                expiry_date__lte=self.today + timedelta(days=end),
            ).count()

            data.append({
                "range": label,
                "items": count,
            })

        return data

    def category_distribution(self):
        qs = self._queryset()

        return list(
            qs.values("category")
              .annotate(count=Count("id"))
              .order_by("category")
        )

    def monthly_expiry_trend(self):
        qs = self._queryset()

        trend = {}

        for item in qs:
            month = item.expiry_date.strftime("%b")

            trend[month] = trend.get(month, 0) + 1

        return [
            {
                "month": month,
                "count": count
            }
            for month, count in trend.items()
        ]