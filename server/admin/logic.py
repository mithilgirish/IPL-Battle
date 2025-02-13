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
            'name': team_player.player.name,
            'country': team_player.player.country,
            'score': team_player.player.score,
            'domain': team_player.player.domain
        } for team_player in Team.objects.filter(participant=participant)]
    }


def get_auctioneer_room(room: Room):
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
        } if room.curr_player else None,
        'participants': [{
            'uid': participant.uid.hex,
            'name': participant.name,
            'balance': participant.balance
        } for participant in Participant.objects.filter(room=room)]
    }


def update_curr_player(room: Room, player_uid: str):
    player = Player.objects.get(uid=uuid.UUID(player_uid))
    room.curr_player = player
    room.save()

    return {
        'name': player.name,
        'country': player.country,
        'score': player.score,
        'domain': player.domain
    }


def allocate_player(room: Room, participant_id: str, amt: int):
    participant = Participant.objects.get(uid=uuid.UUID(participant_id), room=room)

    if (participant.balance < amt): return { 'valid': False, 'message': 'Insufficient funds!' }
    if is_player_allocated(room): return { 'valid': False, 'message': 'Player already allocated!' }

    participant.balance -= amt
    participant.save()
    Team(participant=participant, player=room.curr_player).save()

    return {
        'valid': True,
        'uid': participant_id,
        'balance': participant.balance,
        'player': {
            'name': room.curr_player.name,
            'country': room.curr_player.country,
            'score': room.curr_player.score,
            'domain': room.curr_player.domain
        }
    }


def is_player_allocated(room: Room):
    return len(Team.objects.filter(participant__room=room, player=room.curr_player)) > 0


def get_room_data(user: User, room: Room):
    if user.is_admin or user.is_auc: return get_auctioneer_room(room)
    return get_participant_room(user)