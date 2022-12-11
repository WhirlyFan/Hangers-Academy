from flask import Blueprint, request
from flask_login import login_required, current_user
from ..forms.message_form import CreateMessage, UpdateMessage
from app.models import db, Message
from .auth_routes import validation_errors_to_error_messages

message_routes = Blueprint("messages", __name__)


@message_routes.route("", methods=["POST"])
@login_required
def create_message():
    """
    Creates a message for a channel with channel id in body request
    """

    form = CreateMessage()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data
        create_message = Message(
            message_content=data["message_content"],
            channel_id=data["channel_id"],
            user_id=current_user.id,
        )

        db.session.add(create_message)
        db.session.commit()

        return create_message.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@message_routes.route("/<int:message_id>", methods=["PUT"])
@login_required
def update_message(message_id):
    """
    Updates a message
    """

    form = UpdateMessage()
    form["csrf_token"].data = request.cookies["csrf_token"]

    message = Message.query.get(message_id)

    return "Success"
