from django.db import models
from admin.models import User, Room, Player

# Create your models here.
class Participant(models.Model):
    user = models.OneToOneField(to=User, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    balance = models.FloatField(default=700000)
    room = models.ForeignKey(to=Room, on_delete=models.CASCADE)


class Team(models.Model):
    participant = models.ForeignKey(to=Participant, on_delete=models.CASCADE)
    player = models.ForeignKey(to=Player, on_delete=models.CASCADE)
