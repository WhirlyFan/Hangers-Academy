from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, BooleanField
from wtforms.validators import DataRequired, ValidationError


class CreateServer(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    server_img = StringField("Server Image")
    private = BooleanField("Private")

class UpdateServer(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    server_img = StringField("Server Image")