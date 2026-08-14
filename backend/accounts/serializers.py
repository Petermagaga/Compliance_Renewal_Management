from rest_framework import serializers
from .models import (Company,Department,NotificationPreference)

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model=Company
        fields=[
            "id",
            "name",
            "email",
            "phone",
            "created_at",
        ]

        read_only_fields=[
            "id",
            "created_at"
        ]


class DepartmentSearializers(serializers.ModelSerializer):

    class Meta:
        model=Department
        fields='__all__'


class NotificationPreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model=NotificationPreference
        fields=[
            "email_enabled",
            "whatsapp_enabled",
        ]
        