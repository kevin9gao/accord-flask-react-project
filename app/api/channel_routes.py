from flask import Blueprint, request
from app.models import Channel, db
from app.forms import ChannelForm, EditChannelForm


channel_routes = Blueprint('channels', __name__)

@channel_routes.route("/<int:server_id>")
def all_channels(server_id):
    channels = Channel.query.filter(Channel.server_id == server_id).all()
    print("CHANNELS backend", channels)
    print("channels", [channel.to_dict() for channel in channels])
    return {'channels': [channel.to_dict() for channel in channels]}

@channel_routes.route("/<int:server_id>", methods=['POST'])
def create_channel(server_id):
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    print("FORM DATA", form.data)
    if form.validate_on_submit():
        channel = Channel(name=form.data['name'], server_id=form.data['server_id'])
        db.session.add(channel)
        db.session.commit()
        return channel.to_dict()

@channel_routes.route("/<int:server_id>/<int:id>", methods=['PUT'])
def edit_channel(server_id, id):
    form = EditChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("HITTING BACKEND ROUTE")
    print("FORM", form.data)
    if form.validate_on_submit():
        channel = Channel.query.get(id)
        print("CHANNEL FROM BACKEND QUERY", channel)
        data = request.json
        print("DATA FROM THUNK IN BACKEND", data)
        channel.name = data['name']
        channel.server_id = data['server_id']
        db.session.commit()
        return channel.to_dict()

@channel_routes.route("/<int:server_id>/<int:id>", methods=['DELETE'])
def delete_channel(server_id, id):
    print("HITTING BACKEND ROUTE")
    channel = Channel.query.get(id)
    print("backend route, server id, id", server_id, id)
    db.session.delete(channel)
    db.session.commit()
    return channel.to_dict()


@channel_routes.route("/@me/<int:convo_id>", methods=['GET', 'POST'])
def direct_messages(convo_id):
    message = 
    pass
