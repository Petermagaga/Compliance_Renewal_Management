from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .serializers import ReminderSerializer
from .services import get_upcoming_reminders


class ReminderListView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        try:

            reminders = get_upcoming_reminders(request.user)

            serializer = ReminderSerializer(
                reminders,
                many=True,
            )

            return Response(
                {
                    "success": True,
                    "message": "Reminders loaded successfully",
                    "data": {
                        "count": len(reminders),
                        "results": serializer.data,
                    },
                },
                status=status.HTTP_200_OK,
            )

        except Exception as exc:

            return Response(
                {
                    "success": False,
                    "message": "Failed to load reminders",
                    "error": str(exc),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )