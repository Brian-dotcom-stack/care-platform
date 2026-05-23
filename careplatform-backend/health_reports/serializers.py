from rest_framework import serializers
from .models import HealthReport


class HealthReportSerializer(serializers.ModelSerializer):
    client_name     = serializers.SerializerMethodField()
    recorded_by_name = serializers.SerializerMethodField()

    class Meta:
        model = HealthReport
        fields = '__all__'
        read_only_fields = ['recorded_by', 'created_at']

    def get_client_name(self, obj):
        return obj.client.get_full_name() if obj.client else None

    def get_recorded_by_name(self, obj):
        return obj.recorded_by.get_full_name() if obj.recorded_by else None


class HealthReportListSerializer(serializers.ModelSerializer):
    client_name      = serializers.SerializerMethodField()
    recorded_by_name = serializers.SerializerMethodField()

    class Meta:
        model = HealthReport
        fields = ['id', 'client', 'client_name', 'date_recorded',
                  'mood', 'appetite', 'concerns', 'recorded_by_name']

    def get_client_name(self, obj):
        return obj.client.get_full_name() if obj.client else None

    def get_recorded_by_name(self, obj):
        return obj.recorded_by.get_full_name() if obj.recorded_by else None