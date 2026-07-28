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


class ReminderLogViewset(viewsets.ModelViewSet):
    permission_classes=[IsAuthenticated]
    serializer_class=ReminderLogSerializer
    queryset=ReminderLog.objects.all()
    def get_queryset(self):
        return ReminderLog.objects.all()