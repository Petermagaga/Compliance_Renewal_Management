from analytics.services.dashboard.dashboard_service import DashboardService
from rest_framework.views import APIView
from core.responses import ApiResponse

class DashboardAPIView(APIView):

    """
    Returns everything required to build the executive dashboard.
    """

    def get(self, request):
        company=request.user.company

        dashboard=DashboardService(company).build()

        return ApiResponse.success(
            data=dashboard,
            message="Dashboard loaded successfully"


        )

