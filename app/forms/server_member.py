from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import User

def user_check(form, field):
    user_id = field.data
    user = User.query.get(user_id)
    if not user:
        raise ValidationError("User couldn't be found")


class AddServerMember(FlaskForm):
    user_id = IntegerField("UserId", validators=[DataRequired()])
