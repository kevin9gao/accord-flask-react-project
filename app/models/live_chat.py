from .db import db
from sqlalchemy.sql import func


class LiveChatMessage(db.Model):
  __tablename__ = 'live_chat_messages'

  id = db.Column(db.Integer, primary_key=True)
  channel_id = db.Column(db.Integer, db.ForeignKey('channels.id'), nullable=False)
  username = db.Column(db.String(100), nullable=False)
  message_body = db.Column(db.String(1000), nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, server_default=func.now())

  def to_dict(self):
      return {
          'id': self.id,
          'channel_id': self.channel_id,
          'username': self.username,
          'message_body': self.message_body,
          'created_at': self.created_at
      }

  channel = db.relationship('Channel', back_populates='messages')
