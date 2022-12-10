from flask import Blueprint, request
from flask_login import login_required, current_user
# from ..forms.server_form import CreateServer, UpdateServer
# from app.models import db, User, Server

message_routes = Blueprint("messages", __name__)

# @message_routes.route("")
