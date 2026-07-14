from authentication.authorization.permissions import (
    Permission,
)

from .base import PermissionRequired


class CanViewUsers(PermissionRequired):
    required_permission = Permission.USERS_VIEW


class CanCreateUsers(PermissionRequired):
    required_permission = Permission.USERS_CREATE


class CanUpdateUsers(PermissionRequired):
    required_permission = Permission.USERS_UPDATE


class CanDeleteUsers(PermissionRequired):
    required_permission = Permission.USERS_DELETE