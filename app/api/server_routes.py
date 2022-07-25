from flask import Blueprint, request
from app.models import Server, db
from app.forms import ServerForm, EditServerForm


server_routes = Blueprint('servers', __name__)

@server_routes.route("/")
def all_servers():
    # print("HITTING BACKEND ROUTE")
    servers = Server.query.all()
    # print("backend ROUTE", servers)
    return {'servers': [server.to_dict() for server in servers]}

@server_routes.route("/", methods=['GET', 'POST'])
def create_server():
    form = ServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print("HITTING BACKEND ROUTE IF STATEMENT")
        server = Server(name=form.data['name'],
                        owner_id=form.data['owner_id'])
        db.session.add(server)
        db.session.commit()
        print("backend ROUTE", server.to_dict())
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
