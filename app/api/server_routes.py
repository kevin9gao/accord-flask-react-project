from crypt import methods
from flask import Blueprint, request
from app.forms.join_server_form import JoinServerForm
from app.models import Server, User, db
from app.models.server import members
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
    print("HITTING BACKEND ROUTE")
    form = ServerForm()
    print(form)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print("HITTING BACKEND ROUTE IF STATEMENT")
        server = Server(name=form.data['name'],
                        owner_id=form.data['owner_id'],
                        server_pic_url=form.data['server_pic_url'])
        db.session.add(server)
        db.session.commit()
        print("backend ROUTE", server.to_dict())
        return server.to_dict()

@server_routes.route("/<int:id>", methods=['PUT'])
def edit_server(id):
    form = EditServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("backendROUTE", form.data)
    if form.validate_on_submit():
        server = Server.query.get(id)
        data = request.json
        server.name = data['name']
        server.owner_id = data['owner_id']
        server.server_pic_url = form.data['server_pic_url']
        db.session.commit()
        return server.to_dict()

@server_routes.route("/<int:id>", methods=['DELETE'])
def delete_server(id):
    server = Server.query.get(id)
    db.session.delete(server)
    db.session.commit()
    return server.to_dict()

@server_routes.route('/<int:id>/join', methods=['POST'])
def join_server(id):
    form = JoinServerForm()
    # print('BACKEND id', id)
    # print('BACKEND FORM.DATA', form.data)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print('validated ON SUBMIT')
        user = User.query.get(form.data['user_id'])
        server = Server.query.get(form.data['server_id'])
        # print('user from query:', user)
        # print('server from query:', server)
        user.servers_joined.append(server)
        db.session.add(user)
        db.session.commit()
        # print('user.servers_joined', user.servers_joined)
        print('LIST COMPREHENSION RESULT:', {'user-servers': [server.to_dict() for server in user.servers_joined]})
        return {'servers': [server.to_dict() for server in user.servers_joined]}
