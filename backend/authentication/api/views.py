from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from authentication.serializers import (
    LoginSerializer,
    UserSerializer,
    ChangePasswordSerializer,
)

from authentication.services.authentication_service import (
    AuthenticationService,
)

class LoginAPIView(APIView):
    """
    Authenticate a user and issue JWT tokens.
    """

    authentication_classes = []
    permission_classes = []

    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        try:
            result = AuthenticationService.login(
                email=serializer.validated_data["email"],
                password=serializer.validated_data["password"],
            )

            return Response(
                {
                    "success": True,
                    "message": "Login successful.",
                    "data": {
                        "user": UserSerializer(
                            result["user"]
                        ).data,
                        "access": result["access"],
                        "refresh": result["refresh"],
                    },
                },
                status=status.HTTP_200_OK,
            )

        except ValueError as exc:
            return Response(
                {
                    "success": False,
                    "message": str(exc),
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )