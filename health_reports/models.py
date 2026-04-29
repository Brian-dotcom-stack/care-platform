from django.db import models
from simple_history.models import HistoricalRecords
from staff.models import StaffUser
from clients.models import Client


class HealthReport(models.Model):

    MOOD_CHOICES = [
        ('happy',    'Happy'),
        ('calm',     'Calm'),
        ('anxious',  'Anxious'),
        ('agitated', 'Agitated'),
        ('low',      'Low'),
        ('confused', 'Confused'),
    ]

    APPETITE_CHOICES = [
        ('good',   'Good'),
        ('fair',   'Fair'),
        ('poor',   'Poor'),
        ('refused','Refused'),
    ]

    client          = models.ForeignKey(Client, on_delete=models.CASCADE,
                                        related_name='health_reports')
    recorded_by     = models.ForeignKey(StaffUser, on_delete=models.SET_NULL,
                                        null=True, related_name='health_reports')
    date_recorded   = models.DateTimeField()
    mood            = models.CharField(max_length=10, choices=MOOD_CHOICES, blank=True)
    appetite        = models.CharField(max_length=10, choices=APPETITE_CHOICES, blank=True)
    temperature     = models.DecimalField(max_digits=4, decimal_places=1, null=True, blank=True)
    pulse           = models.IntegerField(null=True, blank=True)
    blood_pressure  = models.CharField(max_length=10, blank=True)
    oxygen_level    = models.IntegerField(null=True, blank=True)
    fluid_intake_ml = models.IntegerField(null=True, blank=True)
    food_intake     = models.CharField(max_length=200, blank=True)
    bowel_movement  = models.BooleanField(default=False)
    sleep_quality   = models.CharField(max_length=100, blank=True)
    observations    = models.TextField(blank=True)
    concerns        = models.TextField(blank=True)
    created_at      = models.DateTimeField(auto_now_add=True)
    history         = HistoricalRecords()

    class Meta:
        ordering = ['-date_recorded']

    def __str__(self):
        return f'{self.client} — {self.date_recorded.date()}'