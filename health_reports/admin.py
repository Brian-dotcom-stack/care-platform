from django.contrib import admin
from .models import HealthReport

@admin.register(HealthReport)
class HealthReportAdmin(admin.ModelAdmin):
    list_display = ['client', 'date_recorded', 'mood', 'appetite', 'recorded_by']
    list_filter = ['mood', 'appetite']
    search_fields = ['client__first_name', 'client__last_name']