from .db import db
from sqlalchemy.sql import func


class DirectMessage(db.Model):
    __tablename__ = "direct_messages"

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False, unique=True)
    recipient_id = db.Column(db.Integer, nullable=False, unique=True)
    message_body = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=func.now())

    sender = db.relationship("User", back_populates="messages_sent")
