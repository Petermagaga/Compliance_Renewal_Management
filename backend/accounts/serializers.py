from rest_framework import serializers
from .models import Company,Department

class CompanySerializer(serializers.ModelSerializer):


    class Meta:
        model=Company
        fields='__all__'


class DepartmentSearializers(serializers.ModelSerializer):

    class Meta:
        model=Department
        fields='__all__'
        