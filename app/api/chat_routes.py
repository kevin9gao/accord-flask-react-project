from flask import Blueprint, request
from app.models import LiveChatMessage, DirectMessage, db

chat_routes = Blueprint('chat', __name__)

@chat_routes.route('/live_chat/<int:channel_id>', methods=['GET'])
def get_live_chat_messages(channel_id):
  chat_messages = LiveChatMessage.query.filter(LiveChatMessage.channel_id == channel_id).all()
  return {'chat_history': [message.to_dict() for message in chat_messages]}


# @chat_routes.route('/live_chat/<int:id>', methods=['POST'])


# @chat_routes.route('/dms/<int:id>', methods=['GET'])


# @chat_routes.route('/dms/<int:id>', methods=['POST'])
