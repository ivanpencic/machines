from django.contrib import admin
from django.apps import apps

# Dohvatanje svih modela iz aplikacije
app = apps.get_app_config('machines') 

# Registrovanje svih modela
for model in app.get_models():
    admin.site.register(model)
