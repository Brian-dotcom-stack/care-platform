from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import StaffUser, TrainingRecord, StaffDocument, ClockRecord
from .serializers import StaffListSerializer, StaffDetailSerializer, TrainingRecordSerializer, StaffDocumentSerializer, ClockRecordSerializer
from .permissions import IsAdminRole, IsManagerOrAbove, IsOwnerOrManager


class StaffViewSet(viewsets.ModelViewSet):
    queryset = StaffUser.objects.filter(is_active=True).order_by('last_name')
    search_fields = ['first_name', 'last_name', 'email', 'job_title']
    filterset_fields = ['role', ' contract_type']

    def get_serializer(self):
        if self.action == 'list':
            return StaffListSerializer
        return StaffDetailSerializer
    
    def get_permissions(self):
        if self.action in ('list', 'retrieve'):
            permission_classes = [permissions.IsAuthenticated]
        if self.action in ('create', 'destroy'):
            return [IsAdminRole()]
        return [IsOwnerOrManager()]
    
    @action(detail=False, methods=['get'])
    def me(self, request):
        """Returns the currently logged-in staff member's own profile."""
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'])
    def clock_in(self, request):
        """Clock in - creates a new ClockRecord for the current user"""
        open_record = ClockRecord.objects.filter(staff=request.user, clock_out__isnull=True).first()
        if open_record:
            return Response({'error': 'Already clocked in'}, status=status.HTTP_400_BAD_REQUEST)
        record = ClockRecord.objects.create(staff=request.user, clock_in=timezone.now())
        return Response(ClockRecordSerializer(record).data, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['post'])
    def clock_out(self, request):
        """Clock out - closes the open ClockRecord for the current user"""
        open_record = ClockRecord.objects.filter(staff=request.user, clock_out__isnull=True).first()
        if not open_record:
            return Response({'error': 'Not currently clocked in'}, status=status.HTTP_400_BAD_REQUEST)
        open_record.clock_out = timezone.now()
        open_record.save()
        return Response(ClockRecordSerializer(open_record).data)
    
class TrainingRecordViewSet(viewsets.ModelViewSet):
    serializer_class = TrainingRecordSerializer

    def get_queryset(self):
        return TrainingRecord.objects.filter(staff_id=self.kwargs['staff_pk'])
    
    def perform_create(self, serializer):
        serializer.save(staff_id=self.kwargs['staff_pk'])


class StaffDocumentViewSet(viewsets.ModelViewSet):
    serializer_class = StaffDocumentSerializer

    def get_queryset(self):
        return StaffDocument.objects.filter(staff_id=self.kwargs['staff_pk'])
    
    def perform_create(self, serializer):
        serializer.save(staff_id=self.kwargs['staff_pk'])