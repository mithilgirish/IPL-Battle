from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync

import json, uuid
from . import logic
from lib import auth, utils
from .models import Room

class RoomConsumer(WebsocketConsumer):
    def connect(self):
        scope = dict(self.scope)
        room_uid = scope['url_route']['kwargs']['room_uid']
        
        self.room_name = room_uid

        self.user = None
        try: self.room = Room.objects.get(uid=uuid.UUID(room_uid))
        except: return self.close(reason='Room not found')

        self.accept()
        


    def disconnect(self, code):
        async_to_sync(self.channel_layer.group_discard)(self.room_name, self.channel_name)



    def receive(self, text_data=None, bytes_data=None):
        valid, data = utils.filter_data(text_data)
        if not valid: return self.send(text_data=json.dumps(data))

        if data['action'] == 'AUTH':
            user = auth.get_user(data['token'])

            if not user: return self.close(reason='Invalid user token')
            if not auth.validate_room(user, self.room): return self.close(reason='User does not belong to this room!')

            self.user = user
            async_to_sync(self.channel_layer.group_add)(self.room_name, self.channel_name)

            return self.send(text_data=json.dumps(logic.get_room_data(self.user, self.room)))

        
        if not self.user: return self.send(text_data="Not Authenticated!")    

        if not (self.user.is_admin or self.user.is_auc):
            return self.close(reason='Participant can only listen for data')
        
        
        if data['action'] == 'PLAYER':
            async_to_sync(self.channel_layer.group_send)(self.room_name, { 
                'type': 'player_update', 
                'data': { 'player_uid': logic.update_curr_player(self.room, data['pid']) } 
            })


        elif data['action'] == 'TEAM':
            res = logic.allocate_player(self.room, data['uid'], data['amt'])
            if res['valid']:
                async_to_sync(self.channel_layer.group_send)(
                    self.room_name, { 'type': 'player_add', 'data': res }
                )
            else: self.send(text_data=json.dumps(res))


        else:
            async_to_sync(self.channel_layer.group_send)(self.room_name, 
                { 
                    'type': 'player_revert', 
                    'data': logic.remove_entry(self.room, data['entry_id'])
                }
            )



    def player_update(self, event):
        self.send(text_data=json.dumps({ 'type': 'curr_player', **event['data'] }))

    
    def player_add(self, event):
        self.send(text_data=json.dumps({ 'type': 'team_player', **event['data'] }))

    def player_revert(self, event):
        self.send(text_data=json.dumps({ 'type': 'revert_player', **event['data'] }))
