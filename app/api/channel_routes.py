from flask import Blueprint, request
from app.models import channel, db
from app.forms import ChannelForm, EditChannelForm


channel_routes = Blueprint('channels', __name__)

@channel_routes.route("/")
def all_channels():
    channels = Channel.query.all()
    return {'channels': [channel.to_dict() for channel in channels]}

@channel_routes.route("/", methods=['POST'])
def create_channel():
    form = ChannelForm()
    if form.validate_on_submit():
        channel = channel(name=form.data['name'])
        db.session.add(channel)
        db.session.commit()
        return channel.to_dict()

@channel_routes.route("/<int:id>", methods=['PUT'])
def edit_channel(id):
    form = EditChannelForm()
    if form.validate_on_submit():
        channel = channel.query.get(id)
        data = request.json
        channel.name = data['name']
        db.session.commit()
        return channel.to_dict()

@channel_routes.route("/<int:id>", methods=['DELETE'])
def delete_channel(id):
    channel = Channel.query.get(id)
    db.session.delete(channel)
    db.session.commit()
    return channel.to_dict()
