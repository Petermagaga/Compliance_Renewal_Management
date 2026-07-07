"""
Global business configuration for analytics.

All business thresholds should be defined here.
"""


# ==========================
# Expiry Thresholds
# ==========================

CRITICAL_DAYS = 7

HIGH_PRIORITY_DAYS = 30

EXPIRING_DAYS = 60

LOW_PRIORITY_DAYS = 90


# ==========================
# Dashboard
# ==========================

DEFAULT_RECENT_ITEMS = 5

DEFAULT_ACTIVITY_LIMIT = 5


# ==========================
# Compliance Health Weights
# ==========================

HEALTH_WEIGHTS = {

    "active": 1.0,

    "medium": 0.7,

    "high": 0.4,

    "critical": 0.2,

    "expired": 0.0,
}


# ==========================
# Compliance Ratings
# ==========================

HEALTH_RATINGS = [

    (95, "Excellent", "green"),

    (85, "Good", "emerald"),

    (70, "Fair", "amber"),

    (50, "Poor", "orange"),

    (0, "Critical", "red"),
]