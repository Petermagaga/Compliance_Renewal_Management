from rest_framework import serializers
from .models import ReminderLog,ComplianceItem

class ComplianceItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=ComplianceItem
        fields='__all__'


class ReminderLogSerializer(serializers.ModelSerializer):
    class Meta:
        model=ReminderLog
        fields='__all__'

