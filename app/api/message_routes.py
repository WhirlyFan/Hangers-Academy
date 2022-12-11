from flask import Blueprint, request
from flask_login import login_required, current_user
from ..forms.message_form import CreateMessage, UpdateMessage
from app.models import db, Message
from .auth_routes import validation_errors_to_error_messages
# add authorized from auth_routes
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

    if message and form.validate_on_submit():
        data = form.data
        message.message_content = data["message_content"]
        db.session.commit()
        return message.to_dict()

    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

@message_routes.route("/<int:message_id>", methods=["DELETE"])
@login_required
def delete_message(message_id):
    """
    Deletes a message
    """
    message = Message.query.get(message_id)

    if not message:
        return {
            "message": "Message couldn't be found",
            "status_code": 404
        }
    else:
        db.session.delete(message)
        db.session.commit()
        return {
            "message": "Sucessfully deleted",
            "status_code": 200
        }
