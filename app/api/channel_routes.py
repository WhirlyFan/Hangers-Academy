from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, Server, Channel
from app.forms import ChannelForm
from .auth_routes import validation_errors_to_error_messages
from app.models.messages import Message

channel_routes = Blueprint("channels", __name__)


@channel_routes.route("/<int:channel_id>", methods=["PUT"])
@login_required
def update_channel(channel_id):
    """
    Grabs selected channel and updates with
    requests body and returns updated channel
    """
    form = ChannelForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        name = form.data['name']
        channel = Channel.query.get(channel_id)
        channel.name = name
        db.session.commit()

        return channel.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@channel_routes.route("/<int:channel_id>", methods=["DELETE"])
@login_required
def delete_channel(channel_id):
    """
    Grabs selected channel and deletes from
    database then responds with success message
    """
    channel = Channel.query.get(channel_id)
    if not channel:
        return {
            "message": "Channel couldn't be found",
            "status_code": 404
        }, 404
    else:
        db.session.delete(channel)
        db.session.commit()
        return {"message": "Successfully deleted", "status_code": 200}


@channel_routes.route("", methods=["POST"])
@login_required
def create_channel():
    """
    Creates new channel with request body
    and returns created channel
    """

    form = ChannelForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        server_id = form.data['server_id']
        name = form.data['name']

        new_channel = Channel(server_id=server_id, name=name)
        db.session.add(new_channel)
        db.session.commit()
        return new_channel.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@channel_routes.route("/<int:channel_id>/messages", methods=["GET"])
@login_required
def get_channel_messages(channel_id):
    """
    Get all messages for a channel
    """
    channel_messages = Message.query.filter(
        Message.channel_id == channel_id).all()

    return {
        "Messages": [message.to_dict() for message in channel_messages]
    }
