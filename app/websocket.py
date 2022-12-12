from flask_socketio import SocketIO, emit
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
    # origins = "*"
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)


# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    emit("chat", data, broadcast=True)
