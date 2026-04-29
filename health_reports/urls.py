from rest_framework.routers import DefaultRouter
from .views import HealthReportViewSet

router = DefaultRouter()
router.register(r'health-reports', HealthReportViewSet, basename='health-report')

urlpatterns = router.urls