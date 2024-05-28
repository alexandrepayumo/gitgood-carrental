from django.db import models

from .managers import VehicleManager

from branches.models import Branch

class Vehicle(models.Model):
    class Category(models.TextChoices):
        CAR = 'Car'
        MOTORCYCLE = 'Motorcycle'
        TRUCK = 'Truck'
        VAN = 'Van'
        SUV = 'SUV'
        OTHER = 'Other'

    model = models.CharField(max_length=30)
    brand = models.CharField(max_length=30)
    color = models.CharField(max_length=30, blank=True, null=True)
    year = models.PositiveIntegerField(blank=True, null=True)
    price = models.PositiveIntegerField()
    category = models.CharField(max_length=10, choices=Category.choices, default=Category.OTHER)
    mileage = models.PositiveIntegerField(blank=True, null=True)
    branch = models.ForeignKey(Branch, on_delete=models.PROTECT, null=True, blank=True)

    objects = VehicleManager()

    class Meta:
        db_table = 'vehicle'
