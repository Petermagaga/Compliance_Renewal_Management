from datetime import timedelta

from analytics.config import (
    CRITICAL_DAYS,
    HIGH_PRIORITY_DAYS,
    EXPIRING_DAYS,
    HEALTH_WEIGHTS,
    HEALTH_RATINGS,
)

from .base import BaseAnalyticsService


class HealthService(BaseAnalyticsService):
    """
    Calculates the overall compliance health score.
    """

    def calculate(self):
        qs = self.queryset

        total = qs.count()

        if total == 0:
            return {
                "score": 100.0,
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
            }

        active = 0
        medium = 0
        high = 0
        critical = 0
        expired = 0

        for item in qs:

            days = (item.expiry_date - self.today).days

            if days < 0:
                expired += 1

            elif days <= CRITICAL_DAYS:
                critical += 1

            elif days <= HIGH_PRIORITY_DAYS:
                high += 1

            elif days <= EXPIRING_DAYS:
                medium += 1

            else:
                active += 1

        weighted_score = (
            active * HEALTH_WEIGHTS["active"]
            + medium * HEALTH_WEIGHTS["medium"]
            + high * HEALTH_WEIGHTS["high"]
            + critical * HEALTH_WEIGHTS["critical"]
            + expired * HEALTH_WEIGHTS["expired"]
        )

        score = round((weighted_score / total) * 100, 1)

        rating, color = self.get_rating(score)

        return {
            "score": score,
            "rating": rating,
            "color": color,
            "trend": "stable",
            "breakdown": {
                "active": active,
                "medium": medium,
                "high": high,
                "critical": critical,
                "expired": expired,
            },
        }

    @staticmethod
    def get_rating(score):
        """
        Converts a score into a business rating.
        """

        for minimum, rating, color in HEALTH_RATINGS:
            if score >= minimum:
                return rating, color

        return "Critical", "red"