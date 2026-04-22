from django.db import models
from simple_history.models import HistoricalRecords
from staff.models import StaffUser

class Client(models.Model):

    STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('deceased', 'Deacesed'),
        ('hospital', 'In hospital')
    ]

    GENDER_CHOICES = [
        ('male',   'Male'),
        ('female', 'Female'),
        ('other',  'Other'),
    ]

    first_name       = models.CharField(max_length=100)
    last_name        = models.CharField(max_length=100)
    date_of_birth    = models.DateField()
    gender           = models.CharField(max_length=10, choices=GENDER_CHOICES)
    address          = models.TextField(blank=True)
    phone            = models.CharField(max_length=20, blank=True)
    nhs_number       = models.CharField(max_length=20, blank=True)
    status           = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')
    key_worker       = models.ForeignKey(StaffUser, on_delete=models.SET_NULL,
                                         null=True, blank=True, related_name='key_clients')
    photo            = models.ImageField(upload_to='client_photos/', null=True, blank=True)
    gp_name          = models.CharField(max_length=100, blank=True)
    gp_phone         = models.CharField(max_length=20, blank=True)
    allergies        = models.TextField(blank=True)
    medical_notes    = models.TextField(blank=True)
    history          = HistoricalRecords()

    class Meta:
        ordering = ['last_name', 'first_name']

    def get_full_name(self):
        return f'{self.first_name} {self.last_name}'

    def __str__(self):
        return self.get_full_name()


class CarePlan(models.Model):

    STATUS_CHOICES = [
        ('draft',    'Draft'),
        ('active',   'Active'),
        ('reviewed', 'Reviewed'),
        ('archived', 'Archived'),
    ]

    client       = models.ForeignKey(Client, on_delete=models.CASCADE,
                                     related_name='care_plans')
    title        = models.CharField(max_length=200)
    status       = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')
    created_by   = models.ForeignKey(StaffUser, on_delete=models.SET_NULL,
                                     null=True, related_name='created_plans')
    created_at   = models.DateTimeField(auto_now_add=True)
    reviewed_at  = models.DateField(null=True, blank=True)
    next_review  = models.DateField(null=True, blank=True)
    content      = models.TextField(blank=True)
    goals        = models.TextField(blank=True)
    history      = HistoricalRecords()

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.client.get_full_name()} — {self.title}'


class NextOfKin(models.Model):

    client       = models.ForeignKey(Client, on_delete=models.CASCADE,
                                     related_name='next_of_kin')
    name         = models.CharField(max_length=100)
    relationship = models.CharField(max_length=50)
    phone        = models.CharField(max_length=20, blank=True)
    email        = models.CharField(max_length=100, blank=True)
    is_primary   = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.name} ({self.relationship}) — {self.client.get_full_name()}'