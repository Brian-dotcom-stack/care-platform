from rest_framework.routers import DefaultRouter
from .views import ABCChartViewSet

router = DefaultRouter()
router.register(r'abc-charts', ABCChartViewSet, basename='abc-chart')

urlpatterns = router.urls