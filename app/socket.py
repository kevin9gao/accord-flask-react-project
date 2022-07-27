import os
from flask_socketio import SocketIO, emit, join_room, leave_room, send
from app.models import Channel, db


if os.environ.get('FLASK_ENV') == 'production':
  origins = [
    'https://accord-flask-react.herokuapp.com/'
  ]
else:
  origins = '*'

socketio = SocketIO(cors_allowed_origins=origins)



@socketio.on('chat')
def handle_chat(data):
  print(data)
  emit('chat', data, broadcast=True)

@socketio.on('join')
def on_join(data):
    username = data['username']
    channel = data['channel_name']
    join_room(channel)
    send(username + ' has entered the channel.', to=channel)

@socketio.on('leave')
def on_leave(data):
    username = data['username']
    channel = data['channel_name']
    leave_room(channel)
    send(username + ' has left the channel.', to=channel)
