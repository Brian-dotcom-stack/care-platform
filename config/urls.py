from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from staff.token_serializers import CareConnectTokenSerializer

class CareConnectTokenView(TokenObtainPairView):
    serializer_class = CareConnectTokenSerializer
    
urlpatterns = [
    path('admin/', admin.site.urls),

    # JWT auth endpoints
    path('api/auth/login/', TokenObtainPairView.as_view()),
    path('api/auth/refresh/', TokenRefreshView.as_view()),

    # Staff module endpoints
    path('api/', include('staff.urls')),

    # clients module endpoints
    path('api/', include('clients.urls')),

    # incidents module endpoints
    path('api/', include('incidents.urls')),

    # rostering module endpoint
    path('api/', include('rostering.urls')),

    # health reports module endpoint
    path('api/', include('health_reports.urls')),

    # abc charts module endpoint
    path('api/', include('abc_charts.urls')),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)