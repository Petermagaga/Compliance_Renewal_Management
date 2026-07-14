from authentication.authorization.permissions import (
    Permission,
)

from .base import PermissionRequired


class CanViewDepartments(PermissionRequired):
    required_permission = Permission.DEPARTMENTS_VIEW


class CanManageDepartments(PermissionRequired):
    required_permission = Permission.DEPARTMENTS_MANAGE


    