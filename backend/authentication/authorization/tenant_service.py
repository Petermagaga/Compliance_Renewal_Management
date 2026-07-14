class TenantService:
    """
    Handles all tenant isolation logic
    """
    @staticmethod
    def same_company(user,resource):
        """
        Returns True if the resource belongs to the same company as the user
        """
        return (
            resource.company_id==user.company_id
        )
    
    @staticmethod
    def same_department(user,resource):

        """
        department level isolation.
        """
        if not hasattr(resource,"department_id"):
            return True
        
        return (
            resource.department_id==user.department_id
        )


