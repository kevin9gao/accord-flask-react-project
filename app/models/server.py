from .db import db


class Members(db.Model):
    __tablename__ = "members"

    user_id = db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
    server_id = db.Column('server_id', db.Integer, db.ForeignKey('servers.id'), primary_key=True)
    user = db.relationship("Server", back_populates="servers_joined")
    server = db.relationship("User", back_populates="server_members")


class Server(db.Model):
    __tablename__= 'servers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, unique=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'owner_id': self.owner_id
        }

    owner = db.relationship("User", back_populates="servers_owned")
    channels = db.relationship("Channel", back_populates="server")
    server_members = db.relationship("User", back_populates='servers_joined')
