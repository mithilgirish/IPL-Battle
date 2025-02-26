from participant.models import *
from admin.models import Room

def __get_score(team: list[Team]):
    if not 16 >= len(team) >= 18: return -1

    counts = { 'BA': 0, 'BO': 0, 'AR': 0, 'WK': 0 }
    foreign = score = 0
    for member in team:
        player = member.player
        counts[player.domain] += 1
        foreign += (not player.domestic)
        score += player.score

    if (
        foreign > 7 or
        counts['BA'] < 3 or counts['BO'] < 4 or
        counts['AR'] < 3 or counts['WK'] < 2
    ): return -1

    return score


def get_leaderboard(room: Room):
    teams = dict([
        (
            participant.name, 
            (
                __get_score(Team.objects.filter(participant=participant)),
                participant.balance
            )
        )
        for participant in Participant.objects.filter(room=room)
    ])

    return dict([
        (key, teams[key])
        for key in sorted(teams, key=lambda k: teams[k], reverse=True)
    ])