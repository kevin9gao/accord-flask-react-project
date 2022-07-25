from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Server, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/servers')
@login_required
def user_servers(id):
    # print('hitting /api/users/:userid/servers')
    user = User.query.get(id)
    # print('user', user)
    servers = user.servers_joined
    # print('servers', servers)
    # print('user:', user)
    # print('SERVERS JOINED BY USER', servers)
    return {'servers': [server.to_dict() for server in servers]}
