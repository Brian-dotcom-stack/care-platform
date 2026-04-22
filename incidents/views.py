from rest_framework import viewsets, permissions
from .models import Incident
from .serializers import IncidentSerializer, IncidentListSerializer


class IncidentViewSet(viewsets.ModelViewSet):
    queryset = Incident.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['status', 'severity', 'incident_type', 'client']
    search_fields = ['description', 'client__first_name', 'client__last_name']

    def get_serializer_class(self):
        if self.action == 'list':
            return IncidentListSerializer
        return IncidentSerializer

    def perform_create(self, serializer):
        serializer.save(reported_by=self.request.user)