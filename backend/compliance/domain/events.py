from enum import Enum


class ComplianceEvent(str, Enum):

    CREATED = "created"

    SUBMITTED = "submitted"

    APPROVED = "approved"

    REJECTED = "rejected"

    ACTIVATED = "activated"

    EXPIRING = "expiring"

    RENEWAL_STARTED = "renewal_started"

    RENEWED = "renewed"

    EXPIRED = "expired"

    ARCHIVED = "archived"