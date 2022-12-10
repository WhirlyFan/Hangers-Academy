from flask import Blueprint, request
from flask_login import login_required, current_user
# from ..forms.server_form import CreateServer, UpdateServer
from app.models import db, Message

message_routes = Blueprint("messages", __name__)

@message_routes.route("/messages")
@login_required
def create_message():
    pass
