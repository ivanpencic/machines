from django.db import models
from django.contrib.auth.models import User


class Location(models.Model):
    name = models.CharField(max_length=150)

    def __str__(self):
        return self.name

class MachineType(models.Model):
    name = models.CharField(max_length=150)
    
    def __str__(self):
        return self.name

class Machine(models.Model):
    identifier = models.CharField(max_length=500, unique=True)
    machine_type = models.ForeignKey(
        MachineType, null=True, blank=True, on_delete=models.PROTECT
    )
    location = models.ForeignKey(
        Location, null=True, blank=True, on_delete=models.PROTECT
    )

    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.identifier} {self.machine_type}"

class Tag(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Image(models.Model):
    url = models.CharField(max_length=500)
    machine = models.ForeignKey(
        Machine, null=True, blank=True, on_delete=models.CASCADE
    )

    date_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('url', 'machine') 

    def __str__(self):
        return f"{self.machine} {self.url}"


class ImageTag(models.Model):
    image = models.ForeignKey(
        Image, null=True, blank=True, on_delete=models.CASCADE
    )
    tag = models.ForeignKey(
        Tag, null=True, blank=True, on_delete=models.CASCADE
    )
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.image} {self.tag}"


class Conto(models.Model):
    identifier = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.identifier

class TransactionType(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Currency(models.Model):
    name = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.name

class Transaction(models.Model):
    identifier = models.CharField(max_length=200, unique=True)
    description = models.CharField(max_length=600)
    machine = models.ForeignKey(
        Machine, null=True, blank=True, on_delete=models.PROTECT
    )
    transaction_type = models.ForeignKey(
        TransactionType, null=True, blank=True, on_delete=models.PROTECT
    )
    conto = models.ForeignKey(
        Conto, null=True, blank=True, on_delete=models.PROTECT
    )
    amount = models.DecimalField( 
        max_digits = 10, 
        decimal_places = 2
    )
    currency = models.ForeignKey(
        Currency, null=True, blank=True, on_delete=models.PROTECT
    )

    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.identifier} {self.machine} {self.amount} {self.transaction_type}"

class TransactionLog(models.Model):
    transaction = models.ForeignKey(
        Transaction, null=True, blank=True, on_delete=models.CASCADE
    )
    modifier = models.ForeignKey(
        User, null=True, blank=True, on_delete=models.PROTECT
    )

    date_added = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.transaction} {self.modifier} {self.date_added}"
