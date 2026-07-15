from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .serializers import ReminderLogSerializer,ComplianceItemSerializer
from .models import ComplianceItem,ReminderLog
from .querysets import ComplianceQuerySet


class ComplianceItemViewSet(viewsets.ModelViewSet):
    permission_classes= [IsAuthenticated]
    queryset=ComplianceQuerySet.visible_to(request.user)
    serializer_class=ComplianceItemSerializer

class ReminderLogViewset(viewsets.ModelViewSet):
    permission_classes=[IsAuthenticated]
    queryset=ReminderLog.objects.all()
    serializer_class=ReminderLogSerializer
    
