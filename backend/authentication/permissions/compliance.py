from authentication.authorization.permissions import (
    Permission,
)
from authentication.authorization.policies.compliance_policy import ComplianceApprovalPolicy
from .base import PermissionRequired
from authentication.authorization.permissions import(Permission)
from authentication.authorization.authorization_service import (AuthorizationService)

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
    
    def has_object_permission(self,request,view,obj):
        return(
            AuthorizationService.can_access_resource(
                request.user,self.required_permission,obj
            )
        )

class CanDeleteCompliance(PermissionRequired):
    required_permission = (
        Permission.COMPLIANCE_DELETE
    )


class CanApproveCompliance(PermissionRequired):
    required_permission = (Permission.COMPLIANCE_APPROVE)

    def has_object_permission(self,request,view,obj,):
        return AuthorizationService.authorize(
            user=request.user,permission=self.required_permission,resource=obj,
            policy=ComplianceApprovalPolicy(),
        )