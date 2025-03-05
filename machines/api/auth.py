import json
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from machines.utils import get_bundle_prefix
from machines.settings import DEBUG


@csrf_exempt  # Isključuje CSRF zaštutu za ovaj view 
def logout_user(request):
    if request.method == 'POST':
        # Odjavi korisnika
        logout(request)
        return JsonResponse({
            'status': 'success',
            'message': 'Uspešno ste odjavljeni',
        })
    else:
        # Ako zahtev nije POST, vrati grešku
        return JsonResponse({
            'status': 'error',
            'message': 'Metoda nije dozvoljena',
        }, status=405)

@csrf_exempt  # Isključuje CSRF zaštutu za ovaj view 
def login_user(request):
    if request.method == 'POST':
        # Uzimanje podataka iz JSON tela zahteva
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
        except json.JSONDecodeError:
            return JsonResponse({
                'status': 'error',
                'message': 'Nevalidan JSON',
            }, status=400)

        # Provera autentifikacije
        user = authenticate(request, username=username, password=password)

        if user is not None:
            # Ako je korisnik validan, uloguj ga
            login(request, user)
            return JsonResponse({
                'status': 'success',
                'message': 'Uspešno ste ulogovani',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                },
            })
        else:
            # Ako korisnik nije validan, vrati grešku
            return JsonResponse({
                'status': 'error',
                'message': 'Pogrešno korisničko ime ili lozinka',
            }, status=401)
    else:
        # Ako zahtev nije POST, vrati grešku
        return JsonResponse({
            'status': 'error',
            'message': 'Metoda nije dozvoljena',
        }, status=405)

def check_auth(request):
    if request.user.is_authenticated:
        # Korisnik je ulogovan
        return JsonResponse({
            'status': 'authenticated',
        })
    else:
        # Korisnik nije ulogovan
        return JsonResponse({
            'status': 'unauthenticated',
        }, status=401)

