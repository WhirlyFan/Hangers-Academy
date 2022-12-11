from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from app.models import db, User
from .auth_routes import validation_errors_to_error_messages
from app.forms import FriendForm

friends_routes = Blueprint("friends",__name__)

@friends_routes.route("/current")
@login_required
def get_current_user_friends():
    """
    Queries the current user and responds with a list of its friends
    """
    user = User.query.get(current_user.id)
    friends = user.friends
    friends_list = [friend.to_dict() for friend in friends]

    return {"Friends": friends_list}


@friends_routes.route("", methods=["POST"])
@login_required
def add_friend():
    """
    Grabs current user, queries for the friend by ID,
    then appends friend to the current user and redirects to current user's friends route
    """

    form = FriendForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.get(current_user.id)
        new_friend = User.query.get(form.data['friend_id'])

        user.friends.append(new_friend)
        db.session.commit()

        return redirect(f'{request.base_url}/current')
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@friends_routes.route("/<int:friends_id>", methods=["DELETE"])
@login_required
def remove_friend(friends_id):
    """
    Query current user and friend,
    remove friend from user's friend list in database
    and respond with success message
    """
    user = User.query.get(current_user.id)
    friend = User.query.get(friends_id)

    if friend not in user.friends:
        return { "message": "Friend couldn't be found", "status_code": 404 }

    user.friends.remove(friend)
    db.session.commit()

    return { "message": "Successfully deleted", "status_code": 200 }
