from admin.models import *
from participant.models import *
from auctioneer.models import *

def create_models():
    admin = User(username='admin', password='test', is_admin=True)
    admin.save()

    u1 = User(username='user1', password='test')
    u1.save()
    
    u2 = User(username='user2', password='test')
    u2.save()

    auc = User(username='auc', password='test', is_auc=True)
    auc.save()

    room = Room(name='test')
    room.save()

    Participant(name='Test User 1', user=u1, room=room).save()
    Participant(name='Test User 2', user=u2, room=room).save()

    Auctioneer(user=auc, room=room).save()


import csv
def read_csv():

    choices = {
        'ALL-ROUNDER': 'AR',
        'BATSMAN': 'BA',
        'BOWLER': 'BO',
        'WICKETKEEPER': 'WK'
    }

    with open('./data.csv') as f:
        reader = csv.DictReader(f)
        order = 1
        for row in reader:
            Player(
                name=row['fname'] + ' ' + row['lname'],
                domestic=row['domestic'] == 'Indian',
                score=int(row['score']),
                domain=choices[row['domain'].strip()],
                base_price=int(row['base_price']),
                order=order
            ).save()
            print('Saved', order)
            order += 1