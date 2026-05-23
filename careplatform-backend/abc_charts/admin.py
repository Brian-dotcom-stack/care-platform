from django.contrib import admin
from .models import ABCChart

@admin.register(ABCChart)
class ABCChartAdmin(admin.ModelAdmin):
    list_display = ['client', 'date_occurred', 'behaviour_type', 'intensity', 'recorded_by']
    list_filter = ['behaviour_type', 'intensity']
    search_fields = ['client__first_name', 'client__last_name']