from rest_framework import serializers
from .models import Client, CarePlan, NextOfKin


class NextOfKinSerializer(serializers.ModelSerializer):
    class Meta:
        model = NextOfKin
        fields = '__all__'
        read_only_fields = ['client']


class CarePlanSerializer(serializers.ModelSerializer):
    created_by_name = serializers.SerializerMethodField()

    class Meta:
        model = CarePlan
        fields = '__all__'
        read_only_fields = ['client', 'created_by', 'created_at']

    def get_created_by_name(self, obj):
        return obj.created_by.get_full_name() if obj.created_by else None


class ClientListSerializer(serializers.ModelSerializer):
    full_name      = serializers.SerializerMethodField()
    key_worker_name = serializers.SerializerMethodField()

    class Meta:
        model = Client
        fields = ['id', 'full_name', 'date_of_birth', 'status',
                  'key_worker', 'key_worker_name', 'photo', 'phone']

    def get_full_name(self, obj):
        return obj.get_full_name()

    def get_key_worker_name(self, obj):
        return obj.key_worker.get_full_name() if obj.key_worker else None


class ClientDetailSerializer(serializers.ModelSerializer):
    full_name       = serializers.SerializerMethodField()
    key_worker_name = serializers.SerializerMethodField()

    class Meta:
        model = Client
        fields = '__all__'

    def get_full_name(self, obj):
        return obj.get_full_name()

    def get_key_worker_name(self, obj):
        return obj.key_worker.get_full_name() if obj.key_worker else None