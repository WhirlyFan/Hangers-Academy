from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError


def message_check(form,field):
    #Check message content length
    message_content = field.data
    if len(message_content) > 255:
        raise ValidationError("")

class CreateMessage(FlaskForm):
    message_content = StringField("Message Content", validators=[DataRequired()])
