from authentication.authorization.permissions import (
    Permission,
)

from .base import PermissionRequired


class CanViewCompliance(PermissionRequired):
    required_permission = (
        Permission.COMPLIANCE_VIEW
    )


class CanCreateCompliance(PermissionRequired):
    required_permission = (
        Permission.COMPLIANCE_CREATE
    )


class CanUpdateCompliance(PermissionRequired):
    required_permission = (
        Permission.COMPLIANCE_UPDATE
    )


class CanDeleteCompliance(PermissionRequired):
    required_permission = (
        Permission.COMPLIANCE_DELETE
    )


class CanApproveCompliance(PermissionRequired):
    required_permission = (
        Permission.COMPLIANCE_APPROVE
    )