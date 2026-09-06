from rest_framework.routers import DefaultRouter

from .views import ComplianceItemViewSet,ReminderLogViewset

router= DefaultRouter()
router.register('items',ComplianceItemViewSet)

router.register('reminders',ReminderLogViewset)

urlpatterns = router.urls
