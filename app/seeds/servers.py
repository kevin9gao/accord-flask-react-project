from nis import cat
import app
from app.models import db, Server

def seed_servers():
    group = Server(name="Group12", owner_id=1)
    demo_server = Server(name="Demo Server", owner_id=1)
    app_academy = Server(name="App Academy", owner_id=1)
    tft = Server(name="Teamfight Tactics Megaserver", owner_id=2)
    cats = Server(name="Cats R Cool", owner_id=3)
    dogs = Server(name="Dogs R Cooler", owner_id=1)

    servers = [group, demo_server, app_academy, tft, cats, dogs]

    for server in servers:
        db.session.add(server)

    db.session.commit()

def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
