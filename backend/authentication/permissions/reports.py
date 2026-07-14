from authentication.authorization.permissions import (
    Permission,
)

from .base import PermissionRequired


class CanViewReports(PermissionRequired):
    required_permission = Permission.REPORTS_VIEW


class CanExportReports(PermissionRequired):
    required_permission = Permission.REPORTS_EXPORT