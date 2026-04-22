# rostering/views.py
from rest_framework import viewsets, permissions
from .models import Shift
from .serializers import ShiftSerializer

class ShiftViewSet(viewsets.ModelViewSet):
    serializer_class = ShiftSerializer
    permission_classes = [permissions.IsAuthenticated]
    # Keep this here to help DRF, get_queryset will still handle the logic
    queryset = Shift.objects.all() 

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Shift.objects.all()
        return Shift.objects.filter(staff=user)