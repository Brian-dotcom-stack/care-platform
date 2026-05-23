from django.db import models
from django.utils import timezone
from staff.models import StaffUser
from clients.models import Client


class Shift(models.Model):

    SHIFT_TYPES = [
        ('day',    'Day'),
        ('night',  'Night'),
        ('custom', 'Custom')
    ]

    STATUS_CHOICES = [
        ('scheduled',  'Scheduled'),
        ('in_progress','In progress'),
        ('completed',  'Completed'),
        ('missed',     'Missed'),
    ]

    staff       = models.ForeignKey(StaffUser, on_delete=models.CASCADE, related_name='shifts')
    client      = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='shifts')
    start_time  = models.DateTimeField()
    end_time    = models.DateTimeField()
    shift_type  = models.CharField(max_length=10, choices=SHIFT_TYPES, default='day')
    notes       = models.TextField(blank=True)
    status      = models.CharField(max_length=12, choices=STATUS_CHOICES, default='scheduled')

    # Clock in/out fields
    clocked_in_at  = models.DateTimeField(null=True, blank=True)
    clocked_out_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['start_time']

    def __str__(self):
        return f"{self.staff} with {self.client} ({self.start_time.date()})"

    @property
    def hours_worked(self):
        if self.clocked_in_at and self.clocked_out_at:
            delta = self.clocked_out_at - self.clocked_in_at
            return round(delta.total_seconds() / 3600, 2)
        return None

    @property
    def clocked_in_late(self):
        if self.clocked_in_at:
            return self.clocked_in_at > self.start_time
        return False