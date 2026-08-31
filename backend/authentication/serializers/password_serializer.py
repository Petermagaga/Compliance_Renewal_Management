from rest_framework import serializers

class ChangePasswordSerializer(serializers.Serializer):
    """
    Validate password change requests
    """

    current_password=serializers.CharField(write_only=True)
    new_password=serializers.CharField(write_only=True,min_length=8)
    confirm_password=serializers.CharField(write_only=True,min_length=8)

    def validate(self, attrs):
        
        if (
            attrs["new_password"]!=attrs["confirm_password"]):
            raise serializers.ValidationError(
                "Passwords do not match."
            )
        return attrs

class ForgotPasswordSerializer(serializers.Serializer):
    """
    Validate a forgot password request
    """
    email=serializers.EmailField()

class ResetPasswordSerializer(serializers.Serializer):
    """
    validate a password reset request
    """

    uid=serializers.CharField()
    token=serializers.CharField()

    new_password = serializers.CharField(
        write_only=True,
        min_length=8,
    )

    confirm_password=serializers.CharField(
        write_only=True,
        min_length=8
    )

    def validate(self,attrs):

        if attrs["new_password"] != attrs["confirm_password"]:
            raise serializers.ValidationError(
                "passwords do not match."
            )
        return attrs
