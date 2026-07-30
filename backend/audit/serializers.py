from rest_framework import serializers

from .models import Activity


class ActivitySerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()
    user_role = serializers.SerializerMethodField()

    class Meta:
        model = Activity
        fields = [
            "id",
            "activity_type",
            "title",
            "description",
            "user",
            "user_name",
            "user_role",
            "created_at",
        ]

    def get_user_name(self, obj):
        if not obj.user:
            return "System"

        return obj.user.full_name

    def get_user_role(self, obj):
        if not obj.user:
            return None

        return obj.user.role

    