from app.models import db, Server

def seed_servers():
    group = Server(name="Group12", owner_id=1)
    demo_server = Server(name="Demo Server", owner_id=1)
    app_academy = Server(name="App Academy", owner_id=1)

    db.session.add(group)
    db.session.add(demo_server)
    db.session.add(app_academy)

    db.session.commit()

def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
