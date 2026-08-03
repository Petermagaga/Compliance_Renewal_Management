from rest_framework import serializers
from .models import ReminderLog,ComplianceItem
from django.utils import timezone

class ComplianceItemSerializer(serializers.ModelSerializer):

    company_name = serializers.CharField(

        source="company.name",

        read_only=True,

    )

    department_name = serializers.CharField(

        source="department.name",

        read_only=True,

    )

    responsible_person_name = serializers.SerializerMethodField()

    days_remaining = serializers.SerializerMethodField()

    is_overdue = serializers.SerializerMethodField()

    class Meta:

        model = ComplianceItem

        fields = (

            "id",

            "company",
            "company_name",

            "department",
            "department_name",

            "name",

            "category",

            "issue_date",

            "expiry_date",

            "status",

            "priority",

            "responsible_person",
            "responsible_person_name",

            "days_remaining","is_overdue",)

            
    def get_responsible_person_name(self, obj):

        if obj.responsible_person:

            return obj.responsible_person

        return None

    def get_days_remaining(self,obj):

        today=timezone.now().date()

        return (obj.expiry_date - today).days

    def get_is_overdue(self,obj):
        return obj.expiry_date < timezone.now().date()


class ReminderLogSerializer(serializers.ModelSerializer):
    compliance_item_name=serializers.CharField(
        source="compliance_item.name",
        read_only=True,
    )

    class Meta:
        model = ReminderLog
        fields = (
            "id",
            "compliance_item",
            "compliance_item_name",
            "days_before",
            "channel",
            "status",
            "sent_at",
        )