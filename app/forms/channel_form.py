from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Server


def name_check(form, field):
    # Check channel name length
    name = field.data
    if len(name) > 25:
        raise ValidationError("Name must be less than 25 characters")


def server_check(form, field):
    # Check if server exists
    server_id = field.data
    server = Server.query.get(int(server_id))
    if not server:
        raise ValidationError("Server couldn't be found")


class ChannelForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired(), name_check])
    server_id = IntegerField("Server_id", validators=[DataRequired(), server_check])
