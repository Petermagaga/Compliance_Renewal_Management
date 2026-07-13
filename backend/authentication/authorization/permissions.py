from enum import Enum


class Permission(str, Enum):

    # Users
    USERS_VIEW = "users.view"
    USERS_CREATE = "users.create"
    USERS_UPDATE = "users.update"
    USERS_DELETE = "users.delete"

    # Compliance
    COMPLIANCE_VIEW = "compliance.view"
    COMPLIANCE_CREATE = "compliance.create"
    COMPLIANCE_UPDATE = "compliance.update"
    COMPLIANCE_DELETE = "compliance.delete"
    COMPLIANCE_APPROVE = "compliance.approve"

    # Reports
    REPORTS_VIEW = "reports.view"
    REPORTS_EXPORT = "reports.export"

    # Departments
    DEPARTMENTS_VIEW = "departments.view"
    DEPARTMENTS_MANAGE = "departments.manage"

    # Notifications
    NOTIFICATIONS_SEND = "notifications.send"

    # Analytics
    ANALYTICS_VIEW = "analytics.view"