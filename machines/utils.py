import os
import json
from django.http import JsonResponse
from django.contrib.auth.decorators import user_passes_test
from machines import settings


def login_required_401(view_func):
    """
    Custom decorator koji vraća 401 Unauthorized umesto preusmeravanja na login stranicu.
    """
    def _wrapped_view(request, *args, **kwargs):
        if request.user.is_authenticated:
            return view_func(request, *args, **kwargs)
        else:
            return JsonResponse({'error': 'Unauthorized'}, status=401)
    return _wrapped_view

def get_bundle_prefix():
    if settings.DEBUG:
        return ''
    
    manifest_path = os.path.join(settings.BASE_DIR, 'staticfiles', 'manifest.json')
    with open(manifest_path, 'r') as f:
        manifest = json.load(f)

    bundle_hash = manifest.get('main.js', '').replace('/static/','').replace('_bundle.js','')
    return bundle_hash + "_"