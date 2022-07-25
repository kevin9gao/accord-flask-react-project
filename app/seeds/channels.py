from app.models import db, Channel

def seed_channels():
    first_channel = Channel(name="First Channel", server_id=1)
    second_channel = Channel(name="Second Channel", server_id=1)

    db.session.add(first_channel)
    db.session.add(second_channel)
    db.session.commit()


def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
