from rest_framework.permissions import BasePermission
from authentication.authorization.authorization_service import(
    AuthorizationService
)

class PermissionRequired(BasePermission):
    """
    Base permission class
    Child classes only define the required permission
    """

    required_permission=None

    message=(
        "you do not have permission to perform this action"
    )


    def has_permission(self,request,view):
        if self.required_permission is None:
            return False
        
        return AuthorizationService.has_permission(
            request.user,
            self.required_permission,
        )
    