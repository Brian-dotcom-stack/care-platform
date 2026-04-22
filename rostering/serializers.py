# rostering/serializers.py
from rest_framework import serializers
from .models import Shift

class ShiftSerializer(serializers.ModelSerializer):
    # These 'source' lines are what provide the names for your HTML
    staff_name = serializers.ReadOnlyField(source='staff.get_full_name')
    client_name = serializers.ReadOnlyField(source='client.get_full_name')

    class Meta:
        model = Shift
        fields = ['id', 'staff', 'staff_name', 'client', 'client_name', 
                  'start_time', 'end_time', 'shift_type', 'notes']