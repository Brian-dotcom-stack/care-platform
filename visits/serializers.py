from rest_framework import serializers
from .models import Visit

class VisitSerializer(serializers.ModelSerializer):
    client_name = serializers.CharField(source='client.full_name', read_only=True)
    staff_name = serializers.CharField(source='staff.full_name', read_only=True)

    class Meta:
        model = Visit
        fields = [
            'id',
            'client',
            'client_name',
            'staff',
            'staff_name',
            'date',
            'time',
            'type',
            'status',
            'notes',
            'created_at',
        ]
