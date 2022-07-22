from .db import db

members = db.Table(
    'members',
    db.Model.metadata,
    db.Column('users', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('servers', db.Integer, db.ForeignKey('servers.id'), primary_key=True),
)


class Server(db.Model):
    __tablename__= 'servers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, unique=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    owner = db.relationship("User", back_populates="servers_owned")
    server_members = db.relationship("User",
        secondary=members,
        back_populates='servers_joined',
        cascade='all, delete'
        )
