from rest_framework import serializers

class ChangePasswordSerializer(serializers.Serializer):
    """
    Validate password change requests
    """

    current_password=serializers.CharField(write_only=True)
    new_password=serializers.CharField(write_only=True,min_length=8)
    confirm_password=serializers.CharField(write_onl=True,min_length=8)

    def validate(self, attrs):
        
        if (
            attrs["new_password"]!=attrs["confirm_password"]):
            raise serializers.ValidationError(
                "Passwords do not match."
            )
        return attrs
