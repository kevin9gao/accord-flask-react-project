import os
from flask_socketio import SocketIO, emit, join_room, leave_room


if os.environ.get('FLASK_ENV') == 'production':
  origins = [
    'https://accord-flask-react.herokuapp.com/'
  ]
else:
  origins = '*'

socketio = SocketIO(cors_allowed_origins=origins)

@socketio.on('connect')
def connection():
    print("connected")


@socketio.on('disconnet')
def disconnection():
    print("disconneted")