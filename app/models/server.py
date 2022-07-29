from .db import db

members = db.Table(
    'members',
    db.Model.metadata,
    db.Column('users', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('servers', db.Integer, db.ForeignKey('servers.id'), primary_key=True),
)


class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, unique=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    server_pic_url = db.Column(db.String(255), nullable=True)


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'owner_id': self.owner_id,
            'server_pic_url': self.server_pic_url
        }

    owner = db.relationship("User", back_populates="servers_owned")
    channels = db.relationship("Channel", back_populates="server", cascade="all, delete")
    server_members = db.relationship("User",
        secondary=members,
        back_populates='servers_joined'
        )
