from django.db import models
from simple_history.models import HistoricalRecords
from staff.models import StaffUser
from clients.models import Client


class ABCChart(models.Model):

    INTENSITY_CHOICES = [
        ('mild',     'Mild'),
        ('moderate', 'Moderate'),
        ('severe',   'Severe'),
    ]

    BEHAVIOUR_TYPE_CHOICES = [
        ('verbal',    'Verbal'),
        ('physical',  'Physical'),
        ('self_harm', 'Self harm'),
        ('property',  'Property damage'),
        ('non_verbal','Non verbal'),
        ('other',     'Other'),
    ]

    client           = models.ForeignKey(Client, on_delete=models.CASCADE,
                                         related_name='abc_charts')
    recorded_by      = models.ForeignKey(StaffUser, on_delete=models.SET_NULL,
                                         null=True, related_name='abc_charts')
    date_occurred    = models.DateTimeField()
    duration_minutes = models.IntegerField(null=True, blank=True)
    intensity        = models.CharField(max_length=10, choices=INTENSITY_CHOICES)
    behaviour_type   = models.CharField(max_length=12, choices=BEHAVIOUR_TYPE_CHOICES)

    antecedent       = models.TextField(help_text="What happened immediately before the behaviour?")
    behaviour        = models.TextField(help_text="Describe the behaviour in detail")
    consequence      = models.TextField(help_text="What happened as a result? How was it managed?")

    location         = models.CharField(max_length=200, blank=True)
    witnesses        = models.TextField(blank=True)
    follow_up        = models.TextField(blank=True)
    created_at       = models.DateTimeField(auto_now_add=True)
    history          = HistoricalRecords()

    class Meta:
        ordering = ['-date_occurred']

    def __str__(self):
        return f'{self.client} — {self.date_occurred.date()} — {self.behaviour_type}'