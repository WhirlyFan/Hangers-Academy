from flask import Blueprint, request
from flask_login import login_required, current_user
from ..forms.server_form import CreateServer, UpdateServer
from app.models import db, User, Server
from .auth_routes import validation_errors_to_error_messages, authorized

server_routes = Blueprint("servers", __name__)


@server_routes.route("/current")
@login_required
def get_servers_current():
    """
    Query for servers that the current logged in user is in
    """
    user = User.query.get(current_user.id)

    all_servers = [server.to_dict() for server in user.servers]

    return {"Servers": all_servers}


@server_routes.route("/<int:server_id>")
@login_required
def get_server_details(server_id):
    """
    Query for details of a server by server id
    """
    server = Server.query.get(server_id).to_dict()

    return server


@server_routes.route("")
@login_required
def get_all_servers():
    """
    Query for all servers
    """
    all_servers = Server.query.all()

    all_servers_to_dict = [server.to_dict() for server in all_servers]

    return {"Servers": all_servers_to_dict}


@server_routes.route("/<int:server_id>/users", methods=["POST"])
@login_required
def post_server_member(server_id):
    """
    Add a user to a specified server id
    """
    user = User.query.get(current_user.id)

    server = Server.query.get(server_id)

    server.members.append(user)
    db.session.commit()

    return server.to_dict()


@server_routes.route("", methods=["POST"])
@login_required
def create_server():
    """
    Create a new server
    """
    form = CreateServer()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data
        create_server = Server(
            name=data["name"],
            server_img=data["server_img"],
            private=data["private"],
            owner_id=current_user.id,
        )

        user = User.query.get(current_user.id)
        create_server.members.append(user)

        db.session.add(create_server)
        db.session.commit()

        return create_server.to_dict()

    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@server_routes.route("/<int:server_id>", methods=["PUT"])
@login_required
def update_server(server_id):
    """
    Update a Server only if a user is authorized
    """

    form = UpdateServer()
    form["csrf_token"].data = request.cookies["csrf_token"]

    server = Server.query.get(server_id)

    if not authorized(server.owner_id):
        return {"error": "You do not own this server"}, 401

    if server and form.validate_on_submit():
        data = form.data
        server.name = data["name"]
        server.server_img = data["server_img"]
        db.session.commit()
        return server.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@server_routes.route("/<int:server_id>", methods=["DELETE"])
@login_required
def delete_server(server_id):
    """
    Delete a Route only if user is authorized
    """
    server = Server.query.get(server_id)

    if not authorized(server.owner_id):
        return {"error": "You do not own this server"}, 401

    if not server:
        return {"message": "Server couldn't be found"}, 404
    else:
        db.session.delete(server)
        db.session.commit()
        return {"message": "Successfully deleted"}
