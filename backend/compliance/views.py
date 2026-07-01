from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .serializers import ReminderLogSerializer,ComplianceItemSerializer
from .models import ComplianceItem,ReminderLog


class ComplianceItemViewSet(viewsets.ModelViewSet):
    permission_classes= [IsAuthenticated]
    queryset=ComplianceItem.objects.all()
    serializer_class=ComplianceItemSerializer

class ReminderLogViewset(viewsets.ModelViewSet):
    permission_classes=[IsAuthenticated]
    queryset=ReminderLog.objects.all()
    serializer_class=ReminderLogSerializer
    
