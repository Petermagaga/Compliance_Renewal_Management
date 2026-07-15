from .permission_matrix import PERMISSION_MATRIX
from permissions import Permission
from authorization.tenant_service import (
    TenantService
)

class AuthorizationService:
    """
    Central authorization engine.
    Every permission decision in the application
    goes through this service

    """

    @staticmethod
    def has_permission(user,permission):
        """
        Return True if the user has thr given permission.
        """

        if not user.is_authenticated:
            return False
        
        permissions=PERMISSION_MATRIX.get(
            user.role,
            set(),
        )

        permission_name=(
            permission.value
            if hasattr(permission,"value")
            else permission
        )

        return permission_name in permission
    
    @staticmethod
    def can_view_compliance(user):
        return AuthorizationService.has_permission(
            user,
            Permission.COMPLIANCE_VIEW,
        )

    @staticmethod
    def can_create_compliance(user):
        return AuthorizationService.has_permission(
            user,
            Permission.COMPLIANCE_CREATE,
        )

    @staticmethod
    def can_update_compliance(user):
        return AuthorizationService.has_permission(
            user,
            Permission.COMPLIANCE_UPDATE,
        )

    @staticmethod
    def can_delete_compliance(user):
        return AuthorizationService.has_permission(
            user,
            Permission.COMPLIANCE_DELETE,
        )
    
    @staticmethod
    def can_access_resource(
        user,
        permission,
        resource,
    ):

        if not AuthorizationService.has_permission(
            user,
            permission,
        ):
            return False

        if user.is_superuser:
            return True

        if not TenantService.same_company(
            user,
            resource,
        ):
            return False

        return True