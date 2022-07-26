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
    server_pic_url = db.Column(db.String(255), nullable=True, default='https://www.crn.com/resources/025f-0fe9595205a2-2a2f315866b2-1000/data-center-servers-supercomputers.jpg')
    server_cover_pic_url = db.Column(db.String(255), nullable=True, default='https://media.istockphoto.com/photos/abstract-blue-flight-in-space-hyper-jump-3d-rendering-picture-id1288036111?k=20&m=1288036111&s=612x612&w=0&h=Nmjm1IeQQb2oAQhnfvlhbTelZar5s1x7dTpD-1M4rik=')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'owner_id': self.owner_id
        }

    owner = db.relationship("User", back_populates="servers_owned")
    channels = db.relationship("Channel", back_populates="server", cascade="all, delete")
    server_members = db.relationship("User",
        secondary=members,
        back_populates='servers_joined'
        )
