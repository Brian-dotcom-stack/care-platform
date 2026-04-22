from rest_framework import viewsets, permissions
from .models import Client, CarePlan, NextOfKin
from .serializers import (ClientListSerializer, ClientDetailSerializer,
                           CarePlanSerializer, NextOfKinSerializer)


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    search_fields = ['first_name', 'last_name', 'nhs_number']
    filterset_fields = ['status', 'key_worker']

    def get_serializer_class(self):
        if self.action == 'list':
            return ClientListSerializer
        return ClientDetailSerializer


class CarePlanViewSet(viewsets.ModelViewSet):
    serializer_class = CarePlanSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CarePlan.objects.filter(client_id=self.kwargs['client_pk'])

    def perform_create(self, serializer):
        serializer.save(
            client_id=self.kwargs['client_pk'],
            created_by=self.request.user
        )


class NextOfKinViewSet(viewsets.ModelViewSet):
    serializer_class = NextOfKinSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return NextOfKin.objects.filter(client_id=self.kwargs['client_pk'])

    def perform_create(self, serializer):
        serializer.save(client_id=self.kwargs['client_pk'])