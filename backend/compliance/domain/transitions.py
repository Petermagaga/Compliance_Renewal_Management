from .statuses import ComplianceStatus


ALLOWED_TRANSITIONS = {

    ComplianceStatus.DRAFT: {
        ComplianceStatus.UNDER_REVIEW,
    },

    ComplianceStatus.UNDER_REVIEW: {
        ComplianceStatus.APPROVED,
        ComplianceStatus.REJECTED,
    },

    ComplianceStatus.REJECTED: {
        ComplianceStatus.DRAFT,
    },

    ComplianceStatus.APPROVED: {
        ComplianceStatus.ACTIVE,
    },

    ComplianceStatus.ACTIVE: {
        ComplianceStatus.EXPIRING,
        ComplianceStatus.ARCHIVED,
    },

    ComplianceStatus.EXPIRING: {
        ComplianceStatus.RENEWAL_IN_PROGRESS,
        ComplianceStatus.EXPIRED,
    },

    ComplianceStatus.RENEWAL_IN_PROGRESS: {
        ComplianceStatus.ACTIVE,
        ComplianceStatus.EXPIRED,
    },

    ComplianceStatus.EXPIRED: {
        ComplianceStatus.ARCHIVED,
    },

    ComplianceStatus.ARCHIVED: set(),
}