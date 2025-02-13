from django.db import models
from admin.models import User, Room

# Create your models here.
class Auctioneer(models.Model):
    user = models.OneToOneField(to=User, on_delete=models.CASCADE)
    room = models.OneToOneField(to=Room, on_delete=models.CASCADE)
