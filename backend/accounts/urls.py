from rest_framework.routers import DefaultRouter

from .views import CompanyViewSet, DepartmentViewSet


router = DefaultRouter()

router.register("companies", CompanyViewSet)
router.register("departments", DepartmentViewSet)


urlpatterns = router.urls