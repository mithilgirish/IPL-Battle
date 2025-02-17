from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync

import json, uuid
from . import logic
from lib import auth
from .models import Room

class RoomConsumer(WebsocketConsumer):
    def connect(self):
        scope = dict(self.scope)
        user = auth.get_user(dict(scope['headers']))
        room_uid = scope['url_route']['kwargs']['room_uid']

        if not user: return self.close(reason='Invalid user token')
        if not auth.validate_room(user, room_uid): return self.close(reason='User does not belong to this room!')

        self.room_name = room_uid
        self.user = user
        self.room = Room.objects.get(uid=uuid.UUID(room_uid))
        async_to_sync(self.channel_layer.group_add)(self.room_name, self.channel_name)

        self.accept()
        self.send(text_data=json.dumps({
            'uid': user.uid.hex,
            **logic.get_room_data(self.user, self.room)
        }))


    def disconnect(self, code):
        async_to_sync(self.channel_layer.group_discard)(self.room_name, self.channel_name)


    def receive(self, text_data=None, bytes_data=None):
        if not (self.user.is_admin or self.user.is_auc):
            return self.close(reason='Participant can only listen for data')
        
        data = None
        data = json.loads(text_data)
        
        if data['action'] == 'PLAYER':
            res = logic.update_curr_player(self.room, data['pid'])
            async_to_sync(self.channel_layer.group_send)(
                self.room_name, { 'type': 'player_update', 'data': res }
            )

        elif data['action'] == 'TEAM':
            res = logic.allocate_player(self.room, data['uid'], data['amt'])
            if res['valid']:
                async_to_sync(self.channel_layer.group_send)(
                    self.room_name, { 'type': 'player_add', 'data': res }
                )
            else: self.send(text_data=json.dumps(res))

        else:
            self.close(reason='Invalid action')


    def player_update(self, event):
        self.send(text_data=json.dumps({
            'type': 'curr_player',
            **event['data']
        }))

    
    def player_add(self, event):
        self.send(text_data=json.dumps({
            'type': 'team_player',
            **event['data']
        }))
