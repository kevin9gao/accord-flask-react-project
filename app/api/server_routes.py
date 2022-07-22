from flask import Blueprint, request
from app.models import Server, db
from app.forms import ServerForm, EditServerForm


server_routes = Blueprint('servers', __name__)

@server_routes.route("/")
def all_servers():
    servers = Server.query.all()
    return {'servers': [server.to_dict() for server in servers]}

@server_routes.route("/", methods=['POST'])
def create_server():
    form = ServerForm()
    if form.validate_on_submit():
        server = Server(name=form.data['name'])
        db.session.add(server)
        db.session.commit()
        return server.to_dict()

@server_routes.route("/<int:id>", methods=['PUT'])
def edit_server(id):
    form = EditServerForm()
    if form.validate_on_submit():
        server = Server.query.get(id)
        data = request.json
        server.name = data['name']
        db.session.commit()
        return server.to_dict()

@server_routes.route("/<int:id>", methods=['DELETE'])
def delete_server(id):
    server = Server.query.get(id)
    db.session.delete(server)
    db.session.commit()
    return server.to_dict()
