from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import StaffUser, TrainingRecord, StaffDocument, ClockRecord

@admin.register(StaffUser)
class StaffUserAdmin(UserAdmin):
    list_display = ['username', 'get_full_name', 'role', 'job_title', 'is_active']
    list_filter = ['role', 'contract_type', 'is_active']
    fieldsets = UserAdmin.fieldsets + (
        ('Care platform info', {
            'fields': ('role', 'job_title', 'contract_type', 'start_date', 'end_date', 'manager', 'phone', 
                       'address', 'date_of_birth', 'photo', 'ni_number', 'nok_name', 'nok_relationship', 'nok_phone')
        }),
    )

admin.site.register(TrainingRecord)
admin.site.register(StaffDocument)
admin.site.register(ClockRecord)