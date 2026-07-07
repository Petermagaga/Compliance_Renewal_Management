class CompanyQuerysetMixin:
    """
    Future Mixin  for filtering querysets by the authenticted users company"""
    def get_company(self):
        return self.request.user.company