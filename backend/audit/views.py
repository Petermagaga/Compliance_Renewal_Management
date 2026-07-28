from django.shortcuts import render


from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Activity
from .serializers import ActivitySerializer


class ActivityViewSet(viewsets.ReadOnlyModelViewSet):

    serializer_class = ActivitySerializer

    permission_classes = [IsAuthenticated]

    queryset = Activity.objects.all()[:50]