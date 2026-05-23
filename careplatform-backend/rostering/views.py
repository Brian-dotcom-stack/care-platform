from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import Shift
from .serializers import ShiftSerializer


class ShiftViewSet(viewsets.ModelViewSet):
    queryset = Shift.objects.all()
    serializer_class = ShiftSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['staff', 'client', 'status', 'shift_type']

    @action(detail=True, methods=['post'])
    def clock_in(self, request, pk=None):
        shift = self.get_object()
        if shift.staff != request.user:
            return Response({'error': 'You can only clock in to your own shifts'},
                          status=status.HTTP_403_FORBIDDEN)
        if shift.clocked_in_at:
            return Response({'error': 'Already clocked in to this shift'},
                          status=status.HTTP_400_BAD_REQUEST)
        shift.clocked_in_at = timezone.now()
        shift.status = 'in_progress'
        shift.save()
        return Response(ShiftSerializer(shift).data)

    @action(detail=True, methods=['post'])
    def clock_out(self, request, pk=None):
        shift = self.get_object()
        if shift.staff != request.user:
            return Response({'error': 'You can only clock out of your own shifts'},
                          status=status.HTTP_403_FORBIDDEN)
        if not shift.clocked_in_at:
            return Response({'error': 'You have not clocked in to this shift'},
                          status=status.HTTP_400_BAD_REQUEST)
        if shift.clocked_out_at:
            return Response({'error': 'Already clocked out of this shift'},
                          status=status.HTTP_400_BAD_REQUEST)
        shift.clocked_out_at = timezone.now()
        shift.status = 'completed'
        shift.save()
        return Response(ShiftSerializer(shift).data)

    @action(detail=False, methods=['get'])
    def my_shifts(self, request):
        shifts = Shift.objects.filter(staff=request.user).order_by('start_time')
        serializer = ShiftSerializer(shifts, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def hr_report(self, request):
        if request.user.role not in ('admin', 'manager'):
            return Response({'error': 'Not authorised'},
                          status=status.HTTP_403_FORBIDDEN)
        shifts = Shift.objects.all().select_related('staff', 'client')
        serializer = ShiftSerializer(shifts, many=True)
        return Response(serializer.data)