from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Activity
from .serializers import ActivitySerializer


class ActivityViewSet(viewsets.ReadOnlyModelViewSet):

    serializer_class = ActivitySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        queryset = Activity.objects.select_related(
            "user"
        ).order_by("-created_at")

        if user.company_id:
            queryset = queryset.filter(
                user__company_id=user.company_id
            )

        return queryset[:50]