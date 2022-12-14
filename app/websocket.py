from flask_socketio import SocketIO, emit, send, join_room, leave_room
import os


# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'http://hangersacademy.onrender.com',
        'https://hangersacademy.onrender.com',
        'http://hangersacademy.com',
        'https://hangersacademy.com',
        'http://www.hangersacademy.com',
        'https://www.hangersacademy.com',
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)


@socketio.on('join')
def on_join(data):
    username = data['user']
    room = data['room']
    join_room(room)
    send(username + ' has entered the room.', room=room)


@socketio.on('leave')
def on_leave(data):
    username = data['user']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', room=room)


# # handle chat messages
# @socketio.on("chat")
# def handle_chat(data):
#     emit("chat", data, broadcast=True)

# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    room = data['room']
    emit("chat", data, room=room)
