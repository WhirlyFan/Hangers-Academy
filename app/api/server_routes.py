from flask import Blueprint
from flask_login import login_required, current_user
from app.models import User

server_routes = Blueprint("servers", __name__)


@server_routes.route("/current")
@login_required
def get_servers_current():
    """
    Query for servers that the current logged in user is in
    """
    # print('This is this person id', current_user.id)
    user = User.query.get(current_user.id)
    print("This is the user", user.to_dict())

    servers = user.servers
    print("This is the servers", servers)

    return "success"



