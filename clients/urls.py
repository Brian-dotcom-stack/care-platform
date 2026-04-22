from rest_framework_nested import routers
from .views import ClientViewSet, CarePlanViewSet, NextOfKinViewSet

router = routers.DefaultRouter()
router.register(r'clients', ClientViewSet, basename='client')

client_router = routers.NestedDefaultRouter(router, r'clients', lookup='client')
client_router.register(r'care-plans', CarePlanViewSet, basename='client-care-plans')
client_router.register(r'next-of-kin', NextOfKinViewSet, basename='client-nok')

urlpatterns = router.urls + client_router.urls