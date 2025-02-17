from django.db import models
from admin.models import User, Room, Player

import uuid

# Create your models here.
class Participant(models.Model):
    uid = models.UUIDField(default=uuid.uuid4, primary_key=True)
    user = models.OneToOneField(to=User, on_delete=models.CASCADE)
    name = models.CharField(max_length=30, null=False)
    balance = models.FloatField(default=700000)
    room = models.ForeignKey(to=Room, on_delete=models.CASCADE)


class Team(models.Model):
    uid = models.UUIDField(default=uuid.uuid4, primary_key=True)
    participant = models.ForeignKey(to=Participant, on_delete=models.CASCADE)
    player = models.ForeignKey(to=Player, on_delete=models.CASCADE)
    price = models.IntegerField()
