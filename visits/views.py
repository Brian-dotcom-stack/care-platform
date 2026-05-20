from rest_framework import viewsets, permissions
from .models import Visit
from .serializers import VisitSerializer

class VisitViewSet(viewsets.ModelViewSet):
    queryset = Visit.objects.all().order_by('-date', '-time')
    serializer_class = VisitSerializer
    permission_classes = [permissions.IsAuthenticated]
