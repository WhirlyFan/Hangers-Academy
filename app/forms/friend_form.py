from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import User
from flask_login import current_user


def user_check(form, field):
    friend_id = field.data
    friend = User.query.get(int(friend_id))
    user = User.query.get(current_user.id)

    if not friend:
        raise ValidationError("Friend couldn't be found")
    if friend in user.friends:
        raise ValidationError("This user is already in your friends list")
    if current_user.id == friend.id:
        raise ValidationError("You cannot add yourself as a friend")


class FriendForm(FlaskForm):
    friend_id = IntegerField("Friend_id", validators=[DataRequired(), user_check])
