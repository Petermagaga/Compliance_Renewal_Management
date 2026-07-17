from rest_framework.views import APIView
from rest_framework.response import Response
from compliance.models import ComplianceItem
from rest_framework.permissions import IsAuthenticated


class DashboardStatsView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        total=ComplianceItem.objects.count()
        expired=ComplianceItem.objects.filter(status='expired').count()
        expiring=ComplianceItem.objects.filter(status='expiring').count()
        active=ComplianceItem.objects.filter(status='active').count()


        return Response({
            "total_items":total,
            'expired':expired,
            "expiring_soon":expiring,
            'active':active
        })
