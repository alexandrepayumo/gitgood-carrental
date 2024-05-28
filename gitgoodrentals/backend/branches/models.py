from django.db import models
from .managers import BranchManager
from django_google_maps import fields as map_fields

class Branch(models.Model):
    name = models.CharField(max_length=30)
    address = map_fields.AddressField(max_length=200)
    geolocation = map_fields.GeoLocationField(max_length=100, default='54.504642559881646,-105.02634999999995')

    objects = BranchManager()

    class Meta:
        db_table = 'branch'