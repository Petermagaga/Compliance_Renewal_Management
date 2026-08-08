from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Company, Department
from .serializers import CompanySerializer, DepartmentSearializers


class CompanyViewSet(viewsets.ReadOnlyModelViewSet):

    permission_classes = [IsAuthenticated]

    serializer_class = CompanySerializer

    queryset = Company.objects.all().order_by("name")


class DepartmentViewSet(viewsets.ReadOnlyModelViewSet):

    permission_classes = [IsAuthenticated]

    serializer_class = DepartmentSearializers

    queryset = Department.objects.all().order_by("name")