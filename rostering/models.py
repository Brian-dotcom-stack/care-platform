from django.db import models
from staff.models import StaffUser
from clients.models import Client

class Shift(models.Model):
    # 1. Define the choices FIRST
    SHIFT_TYPES = [
        ('day', 'Day'),
        ('night', 'Night'),
        ('custom', 'Custom')
    ]
    
    staff = models.ForeignKey(StaffUser, on_delete=models.CASCADE, related_name='shifts')
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='shifts')
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    
    # 2. Now you can safely reference SHIFT_TYPES
    shift_type = models.CharField(max_length=10, choices=SHIFT_TYPES, default='day')
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ['start_time']

    def __str__(self):
        return f"{self.staff} with {self.client} ({self.start_time.date()})"