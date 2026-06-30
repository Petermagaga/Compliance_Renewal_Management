from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ReminderLogSerializer,ComplianceItemSerializer
from .models import ComplianceItem,ReminderLog


class ComplianceItemViewSet(viewsets.ModelViewSet):
    queryset=ComplianceItem.objects.all()
    serializer_class=ComplianceItemSerializer

class ReminderLogViewset(viewsets.ModelViewSet):
    queryset=ReminderLog.objects.all()
    serializer_class=ReminderLogSerializer
    
