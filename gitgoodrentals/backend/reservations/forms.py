from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import Reservation

class ReservationCreationForm(UserCreationForm):
    class Meta:
        model = Reservation
        fields = '__all__'


class ReservationChangeForm(UserChangeForm):

    class Meta:
        model = Reservation
        fields = '__all__'