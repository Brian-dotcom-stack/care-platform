from rest_framework import viewsets, permissions
from .models import HealthReport
from .serializers import HealthReportSerializer, HealthReportListSerializer


class HealthReportViewSet(viewsets.ModelViewSet):
    queryset = HealthReport.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['client', 'mood']
    search_fields = ['client__first_name', 'client__last_name', 'observations']

    def get_serializer_class(self):
        if self.action == 'list':
            return HealthReportListSerializer
        return HealthReportSerializer

    def perform_create(self, serializer):
        serializer.save(recorded_by=self.request.user)