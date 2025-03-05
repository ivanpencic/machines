import sys
import traceback
from django.shortcuts import render
from machines.utils import get_bundle_prefix



def error_view(request):
    # Prikupi informacije o grešci
    exc_type, exc_value, exc_traceback = sys.exc_info()
    error_traceback = traceback.format_exception(exc_type, exc_value, exc_traceback)

    # Prikaži grešku samo za administratore(ulogovane)
    if request.user.is_superuser:
        return render(request, '500.html', {'traceback': error_traceback})
    else:
        return render(request, '500.html')


def react_view(request):
    bundle_prefix = get_bundle_prefix()
    return render(request, "index.html", {'bundle_prefix': bundle_prefix})

