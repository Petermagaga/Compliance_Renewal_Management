from django.urls import path
from analytics.views.views import DashboardStatsView
from analytics.views import DashboardAPIView

urlpatterns = [
    path("stats/",DashboardStatsView.as_view()),
    path("dashboard/", DashboardAPIView.as_view())
]
