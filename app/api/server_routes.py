from flask import Blueprint
from flask_login import login_required, current_user
from app.models import db, User, Server

server_routes = Blueprint("servers", __name__)


@server_routes.route("/<int:server_id>/channels")
@login_required
def get_server_channels(server_id):
    """
    Query for all channels in a specified server
    """
    

@server_routes.route("/current")
@login_required
def get_servers_current():
    """
    Query for servers that the current logged in user is in
    """
    # print('This is this person id', current_user.id)
    user = User.query.get(current_user.id)
    # print("This is the user", user.to_dict())

    servers = user.servers
    # print("This is the servers", servers)

    return


@server_routes.route("/<int:server_id>/users", methods=["POST"])
@login_required
def post_server_member(server_id):
    """
    Add a user to a specified server id
    """
    user = User.query.get(current_user.id)
    user_id = user.to_dict()["id"]
    # print(id)

    server = Server.query.get(server_id)
    server_id = server.to_dict()["id"]
    # print(type(server.members))

    server.members.append(user)
    db.session.commit()

    return
