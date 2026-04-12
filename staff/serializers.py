# This is to serialize the staff data for the API
# Serializers convert complex data types, such as Django models, into native Python datatypes that can then be easily rendered into JSON, XML, or other content types. They also provide deserialization, allowing parsed data to be converted back into complex types after being validated.
# In this case, we will create a serializer for the StaffUser model, which will allow us to easily convert staff user instances into JSON format for API responses and also validate incoming data when creating or updating staff users.
from rest_framework import serializers  
from .models import StaffUser, TrainingRecord, StaffDocument, ClockRecord

class StaffListSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffUser
        fields = ['id', 'full_name', 'job_title', 'role', 'email', 'phone', 'photo']

    def get_full_name(self, obj):
        return obj.get_full_name()
    

class StaffDetailSerializer(serializers.ModelSerializer):
    """Full profile - used by admin and managers."""
    full_name = serializers.SerializerMethodField()
    manager_name = serializers.SerializerMethodField()

    class Meta:
        model = StaffUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'full_name', 'role', 
                  'job_title', 'contract_type', 'start_date', 'end_date', 'manager', 'phone', 
                  'address', 'date_of_birth', 'photo', 'ni_number', 'nok_name', 'nok_relationship', 'nok_phone',
                  'is_active', 'date_joined'
        ]
        read_only_fields = ['date_joined']

    def get_full_name(self, obj):
        return obj.get_full_name()
    
    def get_manager_name(self, obj):
        return obj.manager.get_full_name() if obj.manager else None

class TrainingRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingRecord
        fields = '__all__'
        read_only_fields = ['staff']


class StaffDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffDocument
        fields = '__all__'
        read_only_fields = ['staff', 'uploaded_at']



class ClockRecordSerializer(serializers.ModelSerializer):
    hours_worked = serializers.ReadOnlyField()

    class Meta:
        model = ClockRecord
        fields = '__all__'
        read_only_fields = ['staff']