from flask_socketio import SocketIO, emit, send, join_room, leave_room
from app.models import db, Message
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
    send(username + ' has entered the room.', to=room)


@socketio.on('leave')
def on_leave(data):
    username = data['user']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', to=room)

# handle chat messages


@socketio.on("chat")
def handle_chat(data):
    message = Message(
        user_id=data['id'],
        channel_id=data["channelId"],
        message_content=data['msg']
    )
    db.session.add(message)
    db.session.commit()

    if data['room']:
        room = data['room']
        emit("chat", data, broadcast=True, to=room)


@socketio.on("delete")
def handle_delete(data):
    message = Message.query.get(data['id'])
    db.session.delete(message)
    db.session.commit()

    if data['room']:
        room = data['room']
        emit("chat", data, broadcast=True, to=room)
