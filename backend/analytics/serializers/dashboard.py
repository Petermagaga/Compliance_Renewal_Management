from rest_framework import serializers


class SummarySerializer(serializers.Serializer):
    total_items = serializers.IntegerField()
    active = serializers.IntegerField()
    expiring = serializers.IntegerField()
    expired = serializers.IntegerField()
    critical = serializers.IntegerField()
    compliance_health = serializers.FloatField()


class HealthBreakdownSerializer(serializers.Serializer):
    active = serializers.IntegerField()
    medium = serializers.IntegerField()
    high = serializers.IntegerField()
    critical = serializers.IntegerField()
    expired = serializers.IntegerField()


class HealthSerializer(serializers.Serializer):
    score = serializers.FloatField()
    rating = serializers.CharField()
    color = serializers.CharField()
    trend = serializers.CharField()
    breakdown = HealthBreakdownSerializer()

class ReminderSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    category = serializers.CharField()
    department = serializers.CharField()
    responsible_person = serializers.CharField()
    expiry_date = serializers.DateField()
    days_remaining = serializers.IntegerField()
    priority = serializers.CharField()

class ActivitySerializer(serializers.Serializer):
    type = serializers.CharField()
    title = serializers.CharField()
    description = serializers.CharField()
    timestamp = serializers.DateTimeField()

class StatusDistributionSerializer(serializers.Serializer):
    name = serializers.CharField()
    value = serializers.IntegerField()


class ExpiryRangeSerializer(serializers.Serializer):
    range = serializers.CharField()
    items = serializers.IntegerField()


class CategoryDistributionSerializer(serializers.Serializer):
    category = serializers.CharField()
    count = serializers.IntegerField()


class MonthlyTrendSerializer(serializers.Serializer):
    month = serializers.CharField()
    count = serializers.IntegerField()

class ChartsSerializer(serializers.Serializer):
    status_distribution = StatusDistributionSerializer(many=True)
    expiry_ranges = ExpiryRangeSerializer(many=True)
    category_distribution = CategoryDistributionSerializer(many=True)
    monthly_expiry_trend = MonthlyTrendSerializer(many=True)

class DashboardSerializer(serializers.Serializer):
    summary = SummarySerializer()
    charts = ChartsSerializer()
    upcoming_reminders = ReminderSerializer(many=True)
    critical_count = serializers.IntegerField()
    recent_activity = ActivitySerializer(many=True)
    system_health = HealthSerializer()
