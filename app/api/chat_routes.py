from flask import Blueprint, request
from app.forms.dm_form import DMForm
from app.models import LiveChatMessage, DirectMessage, db, User
from app.forms.chat_form import ChatForm

chat_routes = Blueprint('chat', __name__)

@chat_routes.route('/live_chat/<int:channel_id>', methods=['GET'])
def get_live_chat_messages(channel_id):
  chat_messages = LiveChatMessage.query.filter(LiveChatMessage.channel_id == channel_id).all()
  return {'live_chat_history': [message.to_dict() for message in chat_messages]}


@chat_routes.route('/live_chat', methods=['GET', 'POST'])
def post_live_chat_message():
  print('hitting post_live_chat_message route')
  form = ChatForm()
  print(form.data)
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    message = LiveChatMessage(channel_id=form.data['channel_id'],
                              username=form.data['username'],
                              message_body=form.data['message_body'],
                              created_at=form.data['created_at'])
    db.session.add(message)
    db.session.commit()
    print("backend", message.to_dict())
    return message.to_dict()


@chat_routes.route('/dms/<int:user_id>', methods=['GET'])
def get_dms(user_id):
  sender = User.query.filter(User.id == user_id).all()
  messages_sent = sender['messages_sent']
  return {'dm_messages': [message.to_dict() for message in messages_sent]}

@chat_routes.route('/dms/<int:user_id>', methods=['POST'])
def post_dm_messages(user_id):
  form = DMForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    message = DirectMessage (
      sender_id=form.data['sender_id'],
      recipient_id=form.data['recipient_id'],
      message_body =form.data['message_body'],
      created_at=form.data['created_at']
    )
    db.session.add(message)
    db.session.commit()
