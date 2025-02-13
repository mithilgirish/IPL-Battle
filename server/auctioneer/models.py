from django.db import models
from admin.models import User, Room

import uuid

# Create your models here.
class Auctioneer(models.Model):
    uid = models.UUIDField(default=uuid.uuid4, primary_key=True)
    user = models.OneToOneField(to=User, on_delete=models.CASCADE)
    room = models.OneToOneField(to=Room, on_delete=models.CASCADE)
