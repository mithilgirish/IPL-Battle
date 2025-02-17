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
            'entry_id': team_player.uid.hex,
            'player_id': team_player.player.uid.hex,
            'price': team_player.price
        } for team_player in Team.objects.filter(participant=participant)],
    }


def get_auctioneer_room(room: Room):
    return {
        'participants': [{
            'uid': participant.user.uid.hex,
            'name': participant.name,
            'balance': participant.balance,
            'players': [{
                'entry_id': team_player.uid.hex,
                'player_id': team_player.player.uid.hex,
                'price': team_player.price
            } for team_player in Team.objects.filter(participant=participant)],
        } for participant in Participant.objects.filter(room=room)]
    }


def update_curr_player(room: Room, player_uid: str):
    player = Player.objects.get(uid=uuid.UUID(player_uid))
    room.curr_player = player
    room.save()

    return player.uid.hex


def allocate_player(room: Room, participant_id: str, amt: int):
    participant = Participant.objects.get(user__uid=uuid.UUID(participant_id), room=room)

    if (participant.balance < amt): return { 'valid': False, 'message': 'Insufficient funds!' }
    if is_player_allocated(room): return { 'valid': False, 'message': 'Player already allocated!' }

    participant.balance -= amt
    participant.save()
    team = Team(participant=participant, player=room.curr_player, price=amt)
    team.save()

    return {
        'valid': True,
        'uid': participant_id,
        'balance': participant.balance,
        'entry_id': team.uid.hex,
        'player': room.curr_player.uid.hex,
        'price': amt
    }


def remove_entry(room: Room, entry_id: str):
    team = Team.objects.get(participant__room=room, uid=uuid.UUID(entry_id))
    participant = team.participant
    participant.balance += team.price
    participant.save()
    team.delete()

    return {
        'uid': participant.user.uid.hex,
        'entry_id': entry_id
    }


def is_player_allocated(room: Room):
    return len(Team.objects.filter(participant__room=room, player=room.curr_player)) > 0


def get_room_data(user: User, room: Room):
    return {
        "uid": user.uid.hex,
        "all_players": [{
            'uid': player.uid.hex,
            'name': player.name,
            'is_domestic': player.domestic,
            'score': player.score,
            'domain': player.domain
        } for player in Player.objects.all()],
        "curr_player": room.curr_player.uid.hex if room.curr_player else None,
        **(get_auctioneer_room(room) if user.is_admin or user.is_auc else get_participant_room(user))
    }