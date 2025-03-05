import json
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from machines.utils import login_required_401
from machines.api.machines import machines_queries
from machines.models import Machine


@csrf_exempt
@login_required_401
def machine_details(request, machine_id):
    # Dohvati mašinu ili vrati 404 ako ne postoji
    machine = get_object_or_404(Machine, id=machine_id)

    # Dohvati sve transakcije povezane sa mašinom
    transaction_data = machines_queries.get_machine_transactions(machine)
    
    # Dohvati sve slike povezane sa mašinom
    image_data = machines_queries.get_machine_images(machine)

    # Podaci o mašini
    machine_data = {
        'id': machine.id,
        'identifier': machine.identifier,
        'machine_type': machine.machine_type.name if machine.machine_type else None,
        'location': machine.location.name if machine.location else None,
        'date_added': machine.date_added.strftime('%Y-%m-%d %H:%M:%S'),
        'images': image_data,
        'transactions': transaction_data,
    }

    return JsonResponse(machine_data)

@csrf_exempt
@login_required_401
def machines_list(request):
    machines = machines_queries.get_machines()
    return JsonResponse({
        'machines': machines,
        
    })

