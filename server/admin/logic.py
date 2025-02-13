from participant.models import Participant, Team
from auctioneer.models import Auctioneer
from .models import Room, Player, User

import uuid

def get_participant_room(user: User):
    participant = Participant.objects.get(user=user)
    return {
        'name': participant.name,
        'balance': participant.balance,
        'players': [{
            'name': player.name,
            'country': player.country,
            'score': player.score,
            'domain': player.domain
        } for player in Team.objects.filter(participant=participant)]
    }


def get_auctioneer_room(user: User):
    room = Auctioneer.objects.get(user=user).room
    return {
        'players': [{
            'uid': player.uid.hex,
            'name': player.name,
            'country': player.country,
            'score': player.score,
            'domain': player.domain
        } for player in Player.objects.all()],
        'curr_player': {
            'uid': room.curr_player.uid.hex,
            'name': room.curr_player.name,
            'country': room.curr_player.country,
            'score': room.curr_player.score,
            'domain': room.curr_player.domain
        },
        'participants': [{
            'uid': participant.uid.hex,
            'name': participant.name,
            'balance': participant.balance
        } for participant in Participant.objects.filter(room=room)]
    }


def update_curr_player(user: User, player_uid: str):
    room = Auctioneer.objects.get(user=user).room
    player = Player.objects.get(uid=uuid.UUID(player_uid))
    room.curr_player = player
    room.save()

    return {
        'name': player.name,
        'country': player.country,
        'score': player.score,
        'domain': player.domain
    }


def allocate_player(user: User, participant_id: str, amt: int):
    room = Auctioneer.objects.get(user=user).room
    participant = Participant.objects.get(uid=uuid.UUID(participant_id), room=room)

    if (participant.balance < amt): return {}

    participant.balance -= amt
    participant.save()
    Team(participant=participant, player=room.curr_player).save()

    return {
        'uid': participant_id,
        'balance': participant.balance,
        'player': {
            'name': room.player.name,
            'country': room.player.country,
            'score': room.player.score,
            'domain': room.player.domain
        }
    }

def get_socket_data(user: User):
    if user.is_admin or user.is_auc: return get_auctioneer_room(user)
    return get_participant_room(user)