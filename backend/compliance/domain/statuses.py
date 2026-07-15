from enum import Enum


class ComplianceStatus(str, Enum):
    """
    The official lifecycle states for every compliance item.

    This is the single source of truth for the entire platform.
    """

    DRAFT = "draft"

    UNDER_REVIEW = "under_review"

    REJECTED = "rejected"

    APPROVED = "approved"

    ACTIVE = "active"

    EXPIRING = "expiring"

    RENEWAL_IN_PROGRESS = "renewal_in_progress"

    EXPIRED = "expired"

    ARCHIVED = "archived"

    @classmethod
    def choices(cls):
        return [
            (status.value, status.name.replace("_", " ").title())
            for status in cls
        ]