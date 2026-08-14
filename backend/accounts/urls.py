from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    CompanyViewSet,
    DepartmentViewSet,
    NotificationPreferenceAPIView,
)


router = DefaultRouter()

router.register(
    "companies",
    CompanyViewSet
)

router.register(
    "departments",
    DepartmentViewSet
)


urlpatterns = router.urls + [

    path(
        "notification-preferences/",
        NotificationPreferenceAPIView.as_view(),
        name="notification-preferences",
    ),

]