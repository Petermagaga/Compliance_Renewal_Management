from rest_framework import serializers
from authentication.models import User


class UserSerializer(serializers.ModelSerializer):
    """
    Read-only representation of a user
    """

    full_name=serializers.ReadOnlyField()
    company=serializers.StringRelatedField()
    department=serializers.StringRelatedField()

    class Meta:
        model=User

        fields=(
            "id",
            "email",
            "first_name",
            "last_name",
            "full_name",
            "phone",
            "role",
            "company",
            "department",
            "profile_photo",
            "is_verifield",
            "date_joined",
        )
        read_only_fields = fields