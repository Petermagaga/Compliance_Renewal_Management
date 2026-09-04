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
            "document",
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

    def validate(self, attrs):

        issue_date = attrs.get(
            "issue_date",
            getattr(self.instance, "issue_date", None)
            if self.instance else None
        )

        expiry_date = attrs.get(
            "expiry_date",
            getattr(self.instance, "expiry_date", None)
            if self.instance else None
        )

        if issue_date and expiry_date:

            if expiry_date < issue_date:

                raise serializers.ValidationError({
                    "expiry_date":
                        "Expiry date cannot be earlier than issue date."
                })

        return attrs


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


class ComplianceRenewalSerializer(serializers.Serializer):
    new_issue_date =serializers.DateField()
    new_expiry_date =serializers.DateField()
    document=serializers.FileField(required=False,allow_null=True)

    def validate(self,attrs):
        if attrs["new_expiry_date"] < attrs["new_issue_date"]:
            raise serializers.ValidationError(
                {
                    "new_expiry_date":"Expiry date cannot be earlier than issue date"
                }
            )
        return attrs