from django.contrib import admin
from .models import Incident

@admin.register(Incident)
class IncidentAdmin(admin.ModelAdmin):
    list_display = ['client', 'incident_type', 'severity', 'status', 'date_occurred', 'reported_by']
    list_filter = ['status', 'severity', 'incident_type']
    search_fields = ['client__first_name', 'client__last_name', 'description']