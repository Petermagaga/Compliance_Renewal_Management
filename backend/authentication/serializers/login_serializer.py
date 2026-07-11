from django.contrib.auth import authenticate
from rest_framework import serializers

class LoginSerializer(serializers.Serializer):
    """
    Validates login credentials.

    """
    email=serializers.EmailField()
    password=serializers.CharField(
        write_only=True,trim_whitespace=False,
    )

    def validate(self,attrs):
        email=attrs.get("email")
        password=attrs.get("password")

        if not email or not password:
            raise serializers.ValidationError(
                "Email and password are required"
            )
        
        user=authenticate(username=email,
                          password=password)
        
        if user is None:
            raise serializers.ValidationError(
                "Invalid email or password"
            )
        
        if not user.is_active:
            raise serializers.ValidationError(
                "This account is inactive."
            )
        attrs["user"]=user

        return attrs