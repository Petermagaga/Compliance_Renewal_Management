from compliance.models import ComplianceItem


class ComplianceQuerySet:

    @staticmethod
    def visible_to(user):

        if user.is_superuser:
            return ComplianceItem.objects.all()
        
        return ComplianceItem.objects.filter(
            company=user.company
        )
    