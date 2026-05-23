from rest_framework import viewsets, permissions
from .models import ABCChart
from .serializers import ABCChartSerializer, ABCChartListSerializer


class ABCChartViewSet(viewsets.ModelViewSet):
    queryset = ABCChart.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['client', 'behaviour_type', 'intensity']
    search_fields = ['client__first_name', 'client__last_name', 'behaviour']

    def get_serializer_class(self):
        if self.action == 'list':
            return ABCChartListSerializer
        return ABCChartSerializer

    def perform_create(self, serializer):
        serializer.save(recorded_by=self.request.user)