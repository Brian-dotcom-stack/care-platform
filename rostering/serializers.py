from rest_framework import serializers
from .models import Shift


class ShiftSerializer(serializers.ModelSerializer):
    staff_name  = serializers.SerializerMethodField()
    client_name = serializers.SerializerMethodField()
    hours_worked    = serializers.ReadOnlyField()
    clocked_in_late = serializers.ReadOnlyField()

    class Meta:
        model = Shift
        fields = '__all__'
        read_only_fields = ['clocked_in_at', 'clocked_out_at', 'status']

    def get_staff_name(self, obj):
        return obj.staff.get_full_name() if obj.staff else None

    def get_client_name(self, obj):
        return obj.client.get_full_name() if obj.client else None