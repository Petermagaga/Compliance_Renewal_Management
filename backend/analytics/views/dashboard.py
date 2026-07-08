from analytics.services.dashboard.dashboard_service import DashboardService
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from core.responses import ApiResponse
from accounts.models import Company
from serializers.dashboard import DashboardSerializer

class DashboardAPIView(APIView):

    """
    Returns everything required to build the executive dashboard.
    """

    def get(self, request):
        if request.user.is_superuser:
            company=Company.objects.first()
        else:
            company=getattr(request.user,"company",None)
        if company is None:
            return Response(
                {"Detail":"No company is assigned to this account"},
                status=status.HTTP_403_FORBIDDEN
            )

        dashboard=DashboardService(company).get_dashboard()
        serializer =DashboardSerializer(dashboard)
        return ApiResponse.success(
            data=serializer.data,
            message="Dashboard loaded successfully"


        )

