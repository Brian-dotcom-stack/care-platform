from rest_framework_nested import routers
from .views import StaffViewSet, TrainingRecordViewSet, StaffDocumentViewSet

# Install: pip install drf-nested-routers
# This package handles nested URLs like /api/staff/3/training/
router = routers.DefaultRouter()
router.register(r'staff', StaffViewSet, basename='staff')

staff_router = routers.NestedDefaultRouter(router, r'staff', lookup='staff')
staff_router.register(r'training', TrainingRecordViewSet, basename='staff-training')
staff_router.register(r'documents', StaffDocumentViewSet, basename='staff-documents')

urlpatterns = router.urls + staff_router.urls