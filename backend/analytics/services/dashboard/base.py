from django.utils import timezone

from compliance.models import ComplianceItem

class BaseAnalyticsService:
    """
    Base Class shared by all dashboard analytics services
    """

    def __init__(self,company=None):
        self.company =company
        self.today = timezone.now().date()

    @property
    def queryset(self):
        qs=ComplianceItem.objects.select_related(
            "company","department"
        )

        if self.company:
            qs=qs.filter(company=self.company)

        return qs
        
