import os
from flask_socketio import SocketIO, emit, join_room, leave_room, send


if os.environ.get('FLASK_ENV') == 'production':
  origins = [
    'https://accord-flask-react.herokuapp.com/'
  ]
else:
  origins = '*'

socketio = SocketIO(cors_allowed_origins=origins)



@socketio.on('chat')
def handle_chat(data):
  # emit('chat', data, broadcast=True)
  send({username: data['user'], msg: data['msg'], channel: data['channel']}, to=data['channel'])


# @socketio.on('message')
# def message(data):
#   print(f"\n\n{data}\n\n")
#   send(data)



@socketio.on('join')
def on_join(data):  
    join_room(data["channel"])
    # print("------!!!!-")
    # print f'{data['channel']}
    send(data['username'] + ' has entered the channel.', channel=data['channel'])

@socketio.on('leave')
def on_leave(data):
    # username = data['username']
    # channel = data['channel']
    leave_room(data["channel"])
    # print("-------")
    # print f'{data['channel']}
    send(data['username'] + ' has left the channel.', channel=data['channel'])
