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
def userServers(id):
    user = db.session.query(User.id).join(Server).all()
    # servers = user.servers_joined
    print('SERVERS JOINED BY USER', user)
    return dict(user)
