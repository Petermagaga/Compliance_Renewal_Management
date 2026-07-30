from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .serializers import ReminderLogSerializer,ComplianceItemSerializer
from .models import ComplianceItem,ReminderLog
from .querysets import ComplianceQuerySet
from .pagination import CompliancePagination  
from audit.services import ActivityService  

class ComplianceItemViewSet(viewsets.ModelViewSet):
    permission_classes= [IsAuthenticated]
    serializer_class=ComplianceItemSerializer
    queryset=ComplianceItem.objects.all()
    pagination_class=CompliancePagination
    def get_queryset(self):
        return ComplianceQuerySet.visible_to(self.request.user)

    def perform_create(self, serializer):

        item = serializer.save()

        ActivityService.log(

            activity_type="created",

            title="Compliance Item Created",

            description=(f"{item.name} was added to the compliance registry"

            ),

            user=self.request.user,

        )

    def perform_update(self, serializer):

        item = serializer.save()

        ActivityService.log(

            activity_type="updated",

            title="Compliance Item Updated",

            description=item.name,

            user=self.request.user,
        )


class ReminderLogViewset(viewsets.ModelViewSet):
    permission_classes=[IsAuthenticated]
    serializer_class=ReminderLogSerializer
    queryset=ReminderLog.objects.all()
    def get_queryset(self):
        return ReminderLog.objects.all()