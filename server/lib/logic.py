from participant.models import *
from admin.models import Room

def __get_score(team: list[Team]):
    invalid = lambda msg: { 'score': -1, 'message': msg }

    if not 16 >= len(team) >= 18:
        return invalid('Invalid team size')

    counts = { 'BA': 0, 'BO': 0, 'AR': 0, 'WK': 0 }
    foreign = score = 0
    for member in team:
        player = member.player
        counts[player.domain] += 1
        foreign += (not player.domestic)
        score += player.score + (5 if player.score >= 45 else 0)


    if foreign > 7: return invalid('More than 7 foreign players')
    if counts['BA'] < 3: return invalid('Less than 3 Batsman') 
    if counts['BO'] < 4: return invalid('Less than 4 Bowlers')
    if counts['AR'] < 3: return invalid('Less than 3 All-Rounders')
    if counts['WK'] < 2: return invalid('Less than 2 Wicket Keepers')

    return {
        'score': score,
        'message': 'All Good!'
    }


def get_leaderboard(room: Room):
    teams = dict([
        (
            participant.name, 
            {
                **__get_score(Team.objects.filter(participant=participant)),
                'balance': participant.balance
            }
        )
        for participant in Participant.objects.filter(room=room)
    ])

    return dict([
        (key, teams[key])
        for key in sorted(teams, key=lambda k: (teams[k]['score'], teams[k]['balance']), reverse=True)
    ])