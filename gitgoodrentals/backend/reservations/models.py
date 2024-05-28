from django.db import models
from users.models import CustomUser
from vehicles.models import Vehicle

from .managers import ReservationManager

class Reservation(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.PROTECT)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.PROTECT)
    start_date = models.DateField(null=True)
    end_date = models.DateField(null=True)
    extra_equipment = models.BooleanField(default=False)
    created_on = models.DateField(auto_now_add=True)
    checked_in = models.BooleanField(default=False)
    checked_out = models.BooleanField(default=False)
    cancelled = models.BooleanField(default=False)

    objects = ReservationManager()

    class Meta:
        db_table = 'reservation'