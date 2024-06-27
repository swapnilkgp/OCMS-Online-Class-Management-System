from django import forms

class videouploadform(forms.Form):
    video = forms.FileField()
    # caption = forms.CharField(max_length=100)
