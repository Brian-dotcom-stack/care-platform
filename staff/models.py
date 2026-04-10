from django.db import models
from django.contrib.auth.models import AbstractUser
from simple_history.models import HistoricalRecords

# Create your models here.
class StaffUser(AbstractUser):
    """Custom user model - extends Django's built-in User."""

    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('manager', 'Manager'),
        ('senior_carer', 'Senior Carer'),
        ('carer', 'Carer'),
    ]

    CONTRACT_CHOICES = [
        ('full_time', 'Full-time'),
        ('part_time', 'Part-time'),
        ('bank', 'Bank'),
    ]

    # Role and Employment
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='carer')
    job_title = models.CharField(max_length=100, blank=True)
    contract_type = models.CharField(max_length=20, choices=CONTRACT_CHOICES, default='full_time')
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    manager = models.ForeignKey('self', null=True, blank=True, on_delete=models.SET_NULL, related_name='reports')

    # Personal details
    phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    photo = models.ImageField(upload_to='staff_photos/', null=True, blank=True)
    ni_number = models.CharField(max_length=12, blank=True)

    # Emergency contact
    nok_name = models.CharField('Next of kin name', max_length=100, blank=True)
    nok_phone = models.CharField('Next of kin phone', max_length=20, blank=True)
    nok_relationship = models.CharField('Next of kin relationship', max_length=50, blank=True)

    # Audit trail
    history = HistoricalRecords()

    def __str__(self):
        return f'{self.get_full_name() } ({self.role})'
    

class TrainingRecord(models.Model):
    """Model to track staff training and certifications."""
    staff = models.ForeignKey(StaffUser, on_delete=models.CASCADE, related_name='training_records')
    course_name = models.CharField(max_length=200)
    completed_on = models.DateField()
    expiry_date = models.DateField(null=True, blank=True)
    certificate = models.FileField(upload_to='training/', null=True, blank=True)
    notes = models.TextField(blank=True)
    history = HistoricalRecords()

    class Meta:
        ordering = ['-completed_on']

        def __str__(self):
            return f'{self.staff.get_full_name()} - {self.course_name}'
        

class StaffDocument(models.Model):
    """DBS check, contract, right to work, or other uploaded document."""

    DOC_TYPE_CHOICES = [
        ('dbs', 'DBS Check'),
        ('contract', 'Employment Contract'),
        ('right_to_work', 'Right to Work'),
        ('id', 'ID Document'),
        ('other', 'Other'),
    ]

    staff = models.ForeignKey(StaffUser, on_delete=models.CASCADE, related_name='documents')
    title = models.CharField(max_length=200)
    file = models.FileField(upload_to='staff_documents/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    expiry_date = models.DateField(null=True, blank=True)
    history = HistoricalRecords()

    def __str__(self):
        return f'{self.staff.get_full_name()} - {self.title}'
    

class ClockRecord(models.Model):
    """Model to track clock-in and clock-out times for staff."""
    staff = models.ForeignKey(StaffUser, on_delete=models.CASCADE, related_name='clock_records')
    clock_in = models.DateTimeField()
    clock_out = models.DateTimeField(null=True, blank=True)
    notes = models.TextField(blank=True)
    history = HistoricalRecords()

    class Meta:
        ordering = ['-clock_in']

    @property
    def hours_worked(self):
        if self.clock_out:
            delta = self.clock_out - self.clock_in
            return round(delta.total_seconds() / 3600, 2)
        return None
    
    def __str__(self):
        return f'{self.staff.get_full_name()} - {self.clock_in.date()}'