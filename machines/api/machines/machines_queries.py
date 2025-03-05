from django.db.models import Prefetch
from machines.models import Machine, Image, ImageTag, Transaction, TransactionLog

def get_machine_images(machine):
    images = Image.objects.filter(machine=machine).select_related('machine')
    image_data = []
    for image in images:
        # Dohvati tagove za svaku sliku
        tags = ImageTag.objects.filter(image=image).select_related('tag')
        tag_data = [{'id': tag.tag.id, 'name': tag.tag.name} for tag in tags]
        image_data.append({
            'id': image.id,
            'url': image.url,
            'tags': tag_data,
        })
    return image_data

def get_machine_transactions(machine):
    transactions = Transaction.objects.filter(machine=machine).select_related(
        'transaction_type', 'conto', 'currency'
    )
    transaction_data = []
    for transaction in transactions:
        # Dohvati logove za svaku transakciju
        logs = TransactionLog.objects.filter(transaction=transaction).select_related('modifier')
        log_data = [{
            'id': log.id,
            'modifier': log.modifier.username if log.modifier else None,
            'date_added': log.date_added.strftime('%Y-%m-%d %H:%M:%S'),
        } for log in logs]

        transaction_data.append({
            'id': transaction.id,
            'identifier': transaction.identifier,
            'description': transaction.description,
            'transaction_type': transaction.transaction_type.name if transaction.transaction_type else None,
            'conto': transaction.conto.identifier if transaction.conto else None,
            'amount': float(transaction.amount),  # Decimal se konvertuje u float za JSON
            'currency': transaction.currency.name if transaction.currency else None,
            'date_added': transaction.date_added.strftime('%Y-%m-%d %H:%M:%S'),
            'logs': log_data,
        })
    return transaction_data

def get_machines():
    res = []
    machines = Machine.objects.prefetch_related(
        Prefetch('image_set', queryset=Image.objects.prefetch_related(
            Prefetch('imagetag_set', queryset=ImageTag.objects.select_related('tag'))
        ))
    ).all()

    for machine in machines:
        mac = {
            "id": machine.id,
            "identifier": machine.identifier,
            "images": [],
        }

        for img in machine.image_set.all():
            mac["images"].append({"url":img.url, "tags":[t.tag.name for t in img.imagetag_set.all()]})

        res.append(mac)
    return res
