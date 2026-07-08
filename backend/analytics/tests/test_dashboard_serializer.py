from django.test import TestCase

from analytics.serializers.dashboard import DashboardSerializer


class DashboardSerializerTest(TestCase):

    def test_dashboard_serializer_accepts_valid_data(self):

        payload = {
            "summary": {
                "total_items": 0,
                "active": 0,
                "expiring": 0,
                "expired": 0,
                "critical": 0,
                "compliance_health": 100.0,
            },
            "charts": {
                "status_distribution": [],
                "expiry_ranges": [],
                "category_distribution": [],
                "monthly_expiry_trend": [],
            },
            "upcoming_reminders": [],
            "critical_count": 0,
            "recent_activity": [],
            "system_health": {
                "score": 100,
                "rating": "Excellent",
                "color": "green",
                "trend": "stable",
                "breakdown": {
                    "active": 0,
                    "medium": 0,
                    "high": 0,
                    "critical": 0,
                    "expired": 0,
                },
            },
        }

        serializer = DashboardSerializer(instance=payload)

        self.assertIsNotNone(serializer.data)