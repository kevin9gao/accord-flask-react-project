from .db import db
from sqlalchemy.sql import func


class DirectMessage(db.Model):
    __tablename__ = "direct_messages"

    id = db.Column(db.Integer, primary_key=True)
    recipient_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False, unique=True)
    dm_convo_id = db.Column(db.Integer, db.ForeignKey("dm_conversations.id"), nullable=False)
    message_body = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=func.now())

    recipient = db.relationship("User", back_populates="dms_received")
    dm_conversation = db.relationship("DMConversation", back_populates="direct_messages")

class DMConversation(db.Model):
    __tablename__ = "dm_conversations"

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, nullable=False, server_default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False, onupdate=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'sender_id': self.sender_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    direct_messages = db.relationship("DirectMessage", back_populates="dm_conversation")
    sender = db.relationship("User", back_populates="dm_convo")
