from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import Vehicle


class VehicleCreationForm(UserCreationForm):
    class Meta:
        model = Vehicle
        fields = '__all__'


class VehicleChangeForm(UserChangeForm):

    class Meta:
        model = Vehicle
        fields = '__all__'