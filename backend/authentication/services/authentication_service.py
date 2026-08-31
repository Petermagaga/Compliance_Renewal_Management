from django.contrib.auth import authenticate
from django.utils import timezone
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from rest_framework_simplejwt.tokens import RefreshToken

from authentication.models import User
class AuthenticationService:
    """
    Handles all authentication business workflows
    """

    @staticmethod
    def login(email: str,password: str):
        """
        Authenticate a user and return Jwt tokens
        """
        user=authenticate(
            username=email,
            password=password,
        )

        if user is None:
            raise ValueError("Invalid credentials")
        if not user.is_active:
            raise ValueError(
                "Account is inactive."
            )
        refresh=RefreshToken.for_user(user)
        user.last_login=timezone()

        user.save(update_fields=["last_login"])

        return {
            "user":user,
            "access":str(refresh.access_token),
            "refresh":str(refresh)
        }

    def logout(refresh_token):
        """
        logout workflow.
        Placeholder for token blacklist
        """

        token = RefreshToken(refresh_token)
        token.blacklist()

        return True
    
    def current_user(user):
        """
        Returns authenticated user
        """
        return user

    @staticmethod
    def change_password(user,current_password,new_password,):
        """
        Change a user's password.
        """

        if not user.check_password(
            current_password
        ):
            raise ValueError(
                "Current password is incorrect."
            )

        user.set_password(
            new_password
        )

        user.save(
            update_fields=["password"]
        )

        return user



