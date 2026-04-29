import random
from datetime import timedelta
from django.core.management.base import BaseCommand
from django.utils import timezone

from staff.models import StaffUser
from clients.models import Client
from health_reports.models import HealthReport
from abc_charts.models import ABCChart

# If you have these:
# from incidents.models import Incident
# from rostering.models import Shift


class Command(BaseCommand):
    help = "Seed database with demo care data"

    def handle(self, *args, **kwargs):

        self.stdout.write("Seeding data...")

        # -----------------------------
        # STAFF
        # -----------------------------
        staff_list = []
        for i in range(5):
            staff = StaffUser.objects.create(
                username=f"staff{i}",
                first_name=f"Staff{i}",
                last_name="Care",
                email=f"staff{i}@demo.com"
            )
            staff.set_password("password123")
            staff.save()
            staff_list.append(staff)

        # -----------------------------
        # CLIENTS
        # -----------------------------
        clients = []
        for i in range(6):
            client = Client.objects.create(
                first_name=f"Client{i}",
                last_name="User",
                date_of_birth="1980-01-01"
            )
            clients.append(client)

        # -----------------------------
        # HEALTH REPORTS
        # -----------------------------
        moods = ['happy', 'calm', 'anxious', 'agitated', 'low']
        appetites = ['good', 'fair', 'poor']

        for client in clients:
            for _ in range(3):
                HealthReport.objects.create(
                    client=client,
                    recorded_by=random.choice(staff_list),
                    date_recorded=timezone.now() - timedelta(days=random.randint(0, 5)),
                    mood=random.choice(moods),
                    appetite=random.choice(appetites),
                    temperature=round(random.uniform(36.0, 38.5), 1),
                    pulse=random.randint(60, 100),
                    fluid_intake_ml=random.randint(800, 2000),
                    bowel_movement=random.choice([True, False]),
                    observations="Client stable, no major concerns."
                )

        # -----------------------------
        # ABC CHARTS
        # -----------------------------
        behaviours = ['verbal', 'physical', 'non_verbal']
        intensities = ['mild', 'moderate', 'severe']

        for client in clients:
            for _ in range(2):
                ABCChart.objects.create(
                    client=client,
                    recorded_by=random.choice(staff_list),
                    date_occurred=timezone.now() - timedelta(days=random.randint(0, 5)),
                    duration_minutes=random.randint(1, 20),
                    intensity=random.choice(intensities),
                    behaviour_type=random.choice(behaviours),
                    antecedent="Client asked to attend appointment.",
                    behaviour="Client became agitated and raised voice.",
                    consequence="Staff reassured and de-escalated situation.",
                    location="Living Room"
                )

        # -----------------------------
        # OPTIONAL: INCIDENTS
        # -----------------------------
        # if you have Incident model:
        """
        for client in clients:
            Incident.objects.create(
                client=client,
                recorded_by=random.choice(staff_list),
                description="Minor behavioural incident recorded.",
                date=timezone.now()
            )
        """

        # -----------------------------
        # OPTIONAL: SHIFTS (ROSTERING)
        # -----------------------------
        """
        for staff in staff_list:
            for i in range(5):
                Shift.objects.create(
                    staff=staff,
                    start_time=timezone.now() + timedelta(days=i),
                    end_time=timezone.now() + timedelta(days=i, hours=8)
                )
        """

        self.stdout.write(self.style.SUCCESS("✅ Data seeded successfully!"))