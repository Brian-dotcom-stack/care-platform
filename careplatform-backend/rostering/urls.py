# rostering/urls.py
from rest_framework.routers import DefaultRouter
from .views import ShiftViewSet

router = DefaultRouter()
# Add basename='shift' here
router.register(r'shifts', ShiftViewSet, basename='shift')
urlpatterns = router.urls