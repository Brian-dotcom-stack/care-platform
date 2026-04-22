from django.contrib import admin
from .models import Client, CarePlan, NextOfKin

# Register your models here.
admin.site.register(Client)
admin.site.register(CarePlan)
admin.site.register(NextOfKin)