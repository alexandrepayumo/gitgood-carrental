from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import Branch


class BranchCreationForm(UserCreationForm):
    class Meta:
        model = Branch
        fields = '__all__'


class BranchChangeForm(UserChangeForm):

    class Meta:
        model = Branch
        fields = '__all__'