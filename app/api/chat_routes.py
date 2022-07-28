from flask import Blueprint, request
from app.forms.dm_form import DMForm
from app.models import LiveChatMessage, DirectMessage, db, DMConversation
from app.forms.chat_form import ChatForm

chat_routes = Blueprint('chat', __name__)

@chat_routes.route('/live_chat/<int:channel_id>', methods=['GET'])
def get_live_chat_messages(channel_id):
  chat_messages = LiveChatMessage.query.filter(LiveChatMessage.channel_id == channel_id).all()
  return {'chat_history': [message.to_dict() for message in chat_messages]}


@chat_routes.route('/live_chat/<int:channel_id>', methods=['POST'])
def post_live_chat_message():
  form = ChatForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    message = LiveChatMessage(channel_id=form.data['channel_id'],
                              username=form.data['username'],
                              message_body=form.data['message_body'],
                              created_at=form.data['created_at'])
    db.session.add(message)
    db.session.commit()
    return message.to_dict()


# @chat_routes.route('/dms/<int:dm_id>', methods=['GET'])
# def get_dms(dm_id):
#   dm_messages = DMConversation.query.filter(DMConversation.id == dm_id).all()
#   return {'dm_history': [message.to_dict() for message in dm_messages]}


# @chat_routes.route('/dms/<int:dm_id>', methods=['POST'])
# def post_dm_messages(dm_id):
#   form = DMForm()
#   form['csrf_token'].data = request.cookies['csrf_token']
