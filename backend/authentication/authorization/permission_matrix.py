from .roles import Roles
from .permissions import Permission

PERMISSION_MATRIX = {

    Roles.SUPER_ADMIN: {

        permission.value
        for permission in Permission

    },

    Roles.COMPANY_ADMIN: {

        Permission.USERS_VIEW,

        Permission.USERS_CREATE,

        Permission.USERS_UPDATE,

        Permission.COMPLIANCE_VIEW,

        Permission.COMPLIANCE_CREATE,

        Permission.COMPLIANCE_UPDATE,

        Permission.COMPLIANCE_DELETE,

        Permission.COMPLIANCE_APPROVE,

        Permission.REPORTS_VIEW,

        Permission.REPORTS_EXPORT,

        Permission.DEPARTMENTS_VIEW,

        Permission.DEPARTMENTS_MANAGE,

        Permission.NOTIFICATIONS_SEND,

        Permission.ANALYTICS_VIEW,

    },

    Roles.MANAGER: {

        Permission.COMPLIANCE_VIEW,

        Permission.COMPLIANCE_CREATE,

        Permission.COMPLIANCE_UPDATE,

        Permission.REPORTS_VIEW,

        Permission.REPORTS_EXPORT,

        Permission.ANALYTICS_VIEW,

    },

    Roles.COMPLIANCE_OFFICER: {

        Permission.COMPLIANCE_VIEW,

        Permission.COMPLIANCE_CREATE,

        Permission.COMPLIANCE_UPDATE,

        Permission.COMPLIANCE_APPROVE,

        Permission.ANALYTICS_VIEW,

    },

    Roles.VIEWER: {

        Permission.COMPLIANCE_VIEW,

        Permission.ANALYTICS_VIEW,

    },
}