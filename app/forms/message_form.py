from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Channel


def message_check(form, field):
    # Check message content length
    message_content = field.data
    if len(message_content) > 255:
        raise ValidationError("Message must be less than 255 characters")


def channel_check(form, field):
    # Check if channel exists
    channel_id = field.data
    channel = Channel.query.get(int(channel_id))
    if not channel:
        raise ValidationError("Channel couldn't be found")


class CreateMessage(FlaskForm):
    message_content = StringField(
        "Message Content", validators=[DataRequired(), message_check]
    )
    channel_id = IntegerField("Channel_id", validators=[DataRequired(), channel_check])


class UpdateMessage(FlaskForm):
    message_content = StringField(
        "Message Content", validators=[DataRequired(), message_check]
    )
