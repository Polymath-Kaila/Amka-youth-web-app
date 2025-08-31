from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    REGION_CHOICES = [
        ("Nairobi", "Nairobi"),
        ("Coastal", "Coastal"),
        ("Western", "Western"),
        ("North Eastern", "North Eastern"),
        ("Nyanza", "Nyanza"),
        ("Eastern", "Eastern"),
        ("Rift Valley", "Rift Valley"),
    ]
    GENDER_CHOICES = [
        ("male", "Male"),
        ("female", "Female"),
        ("other", "Other / Prefer not to say"),
    ]

    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=40, blank=True)
    region = models.CharField(max_length=20, choices=REGION_CHOICES, blank=True)
    age = models.PositiveSmallIntegerField(null=True, blank=True)
    gender = models.CharField(max_length=12, choices=GENDER_CHOICES, blank=True)
    interests = models.TextField(blank=True, help_text="Comma-separated interests, e.g., coding, sports, art")

    REQUIRED_FIELDS = ["email"]  # username still required by AbstractUser

    def interests_list(self):
        if not self.interests:
            return []
        return [x.strip() for x in self.interests.split(",") if x.strip()]
