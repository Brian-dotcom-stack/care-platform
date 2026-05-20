from django.db import models
from clients.models import Client
from staff.models import StaffUser

class Visit(models.Model):
    VISIT_TYPES = [
        ('medication', 'Medication'),
        ('welfare', 'Welfare check'),
        ('behaviour', 'Behaviour'),
        ('other', 'Other'),
    ]

    STATUS_CHOICES = [
        ('completed', 'Completed'),
        ('pending', 'Pending'),
        ('cancelled', 'Cancelled'),
    ]

    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='visits')
    staff = models.ForeignKey(StaffUser, on_delete=models.SET_NULL, null=True, related_name='visits')
    date = models.DateField()
    time = models.TimeField()
    type = models.CharField(max_length=20, choices=VISIT_TYPES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.client.full_name} - {self.type} on {self.date}"
