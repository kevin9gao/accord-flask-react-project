from .db import db

class Channel(db.Model):
    __tablename__ = "channels"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, unique=True)
    server_id = db.Column(db.Integer, db.ForeignKey("servers.id"), nullable=False)

    server = db.relationship("Server", back_populates="channels")