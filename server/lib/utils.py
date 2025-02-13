def get_fields(data, keys):
    for key in keys:
        if not data.get(key, False): 
            return False, {}
    
    return True, data


from admin.models import User, Player, Room
from participant.models import Participant
from auctioneer.models import Auctioneer

def create_test():
    room = Room(name='Test Room')
    room.save()

    p = User(username='test', password='test')
    p.save()
    Participant(user=p, name='Test Participant', room=room).save()

    auc = User(username='auc', password='test', is_auc=True)
    auc.save()
    Auctioneer(user=auc, room=room).save()

    admin = User(username='admin', password='test', is_admin=True)
    admin.save()