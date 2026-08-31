from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from authentication.services.authentication_service import AuthenticationService
from authentication.serializers.password_serializer import (ForgotPasswordSerializer,
                                                            ResetPasswordSerializer)

class CurrentUserView(APIView):
    permission_classes= [IsAuthenticated]

    def get(self,request):
        user=request.user

        return Response(
            {
                "success":True,
                "message":"User profile loaded successfully",
                "data":{
                    "id":str(user.id),
                    "email":user.email,
                    "first_name":user.first_name,
                    "last_name":user.last_name,
                    "full_name":user.full_name,
                    "phone":user.phone,
                    "role":user.role,
                    "company":user.company.name if user.company else None,
                    "department":(
                        user.department.name
                        if user.department
                        else None
                    ),
                    "is_verified":user.is_verified,
                }
            }
        )


class ForgotPasswordAPIView(APIView):

    """
    Start the password reset process
    """

    authentication_classes=[]
    permission_classes=[]

    def post(self,request):
        serializer=ForgotPasswordSerializer(
            data=request.data
        )
        serializer.is_valid(raise_exception=True)

        result=AuthenticationService.request_password_reset(
            email=serializer.validated_data["email"]
        )

        return Response(

            {
                "success":True,
                "message":(
                    "if an account exists with this email",
                    "a password reset link has been sent"
                )
            },
            status=status.HTTP_200_OK
            )

class ResetPasswordAPIView(APIView):
    """
    Complete a password reset using a valid reset token.
    """

    authentication_classes = []
    permission_classes = []

    def post(self, request):

        serializer = ResetPasswordSerializer(
            data=request.data
        )

        serializer.is_valid(raise_exception=True)

        uid = serializer.validated_data["uid"]
        token = serializer.validated_data["token"]

        try:
            from django.utils.encoding import force_str
            from django.utils.http import urlsafe_base64_decode

            from authentication.models import User

            user_id = force_str(
                urlsafe_base64_decode(uid)
            )

            user = User.objects.get(
                pk=user_id
            )

        except (
            TypeError,
            ValueError,
            OverflowError,
            User.DoesNotExist,
        ):

            return Response(
                {
                    "success": False,
                    "message": "Invalid password reset link.",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:

            AuthenticationService.reset_password(
                user=user,
                token=token,
                new_password=serializer.validated_data[
                    "new_password"
                ],
            )

            return Response(
                {
                    "success": True,
                    "message": "Password reset successfully.",
                },
                status=status.HTTP_200_OK,
            )

        except ValueError as exc:

            return Response(
                {
                    "success": False,
                    "message": str(exc),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )