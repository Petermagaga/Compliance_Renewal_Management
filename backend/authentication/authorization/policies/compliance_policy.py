from .base_policy import Basepolicy


class ComplianceUpdatepolicy(Basepolicy):
    """
    Business rules for updating compliance items
    """
    def evaluate(self,user,resource):
        #must belong to same company
        if resource.company_id !=user.company_id:
            return False
        
        #archived records are immutable
        if getattr(resource,"is_archived",False):
            return False
        
        return True
    
class ComplianceApprovalPolicy(Basepolicy):

    def evaluate(self,user,resource):

        if resource.status =="renewed":
            return False
        if resource.status=="expired":
            return False
        
        return True