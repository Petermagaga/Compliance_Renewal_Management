from rest_framework import serializers

class ReminderSerializer(serializers.Serializer):
    id=serializers.IntegerField()
    name=serializers.CharField()
    category=serializers.CharField()
    department=serializers.CharField(
        allow_null=True,allow_blank=True,required=False,
    )
    responsible_person=serializers.CharField(
        allow_null=True,allow_blank=True,required=False

    )

    expiry_date=serializers.DateFieldI()
    days_remaining=serializers.IntegerField()

    priority=serializers.CharField()

    
