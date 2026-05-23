from rest_framework import serializers
from .models import Incident


class IncidentSerializer(serializers.ModelSerializer):
    client_name     = serializers.SerializerMethodField()
    reported_by_name = serializers.SerializerMethodField()

    class Meta:
        model = Incident
        fields = '__all__'
        read_only_fields = ['reported_by', 'created_at', 'updated_at']

    def get_client_name(self, obj):
        return obj.client.get_full_name() if obj.client else None

    def get_reported_by_name(self, obj):
        return obj.reported_by.get_full_name() if obj.reported_by else None


class IncidentListSerializer(serializers.ModelSerializer):
    client_name      = serializers.SerializerMethodField()
    reported_by_name = serializers.SerializerMethodField()

    class Meta:
        model = Incident
        fields = ['id', 'client', 'client_name', 'incident_type', 'severity',
                  'status', 'date_occurred', 'reported_by_name', 'description']

    def get_client_name(self, obj):
        return obj.client.get_full_name() if obj.client else None

    def get_reported_by_name(self, obj):
        return obj.reported_by.get_full_name() if obj.reported_by else None