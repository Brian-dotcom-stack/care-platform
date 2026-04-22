from django.db import models
from simple_history.models import HistoricalRecords
from staff.models import StaffUser
from clients.models import Client


class Incident(models.Model):

    TYPE_CHOICES = [
        ('fall',          'Fall'),
        ('medication',    'Medication error'),
        ('behaviour',     'Behaviour'),
        ('injury',        'Injury'),
        ('safeguarding',  'Safeguarding'),
        ('near_miss',     'Near miss'),
        ('other',         'Other'),
    ]

    SEVERITY_CHOICES = [
        ('low',      'Low'),
        ('medium',   'Medium'),
        ('high',     'High'),
        ('critical', 'Critical'),
    ]

    STATUS_CHOICES = [
        ('open',        'Open'),
        ('under_review','Under review'),
        ('closed',      'Closed'),
    ]

    client          = models.ForeignKey(Client, on_delete=models.CASCADE,
                                        related_name='incidents')
    reported_by     = models.ForeignKey(StaffUser, on_delete=models.SET_NULL,
                                        null=True, related_name='reported_incidents')
    incident_type   = models.CharField(max_length=20, choices=TYPE_CHOICES)
    severity        = models.CharField(max_length=10, choices=SEVERITY_CHOICES)
    status          = models.CharField(max_length=15, choices=STATUS_CHOICES,
                                       default='open')
    date_occurred   = models.DateTimeField()
    location        = models.CharField(max_length=200, blank=True)
    description     = models.TextField()
    immediate_action= models.TextField(blank=True)
    follow_up       = models.TextField(blank=True)
    witnesses       = models.TextField(blank=True)
    created_at      = models.DateTimeField(auto_now_add=True)
    updated_at      = models.DateTimeField(auto_now=True)
    history         = HistoricalRecords()

    class Meta:
        ordering = ['-date_occurred']

    def __str__(self):
        return f'{self.get_incident_type_display()} — {self.client} — {self.date_occurred.date()}'