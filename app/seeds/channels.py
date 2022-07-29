
from app.models import db, Channel

def seed_channels():
    first_channel = Channel(name="First Channel", server_id=1)
    second_channel = Channel(name="Second Channel", server_id=1)
    general_aa = Channel(name="General", server_id=3)
    general_tft = Channel(name="General", server_id=4)
    random_aa = Channel(name="Random", server_id=3)
    random_tft = Channel(name="Random", server_id=4)
    dawgs = Channel(name="Dawgs", server_id=6)
    kats = Channel(name="Kats", server_id=5)

    channels = [first_channel, second_channel, general_aa, general_tft, random_aa,
                random_tft, dawgs, kats]

    for channel in channels:
        db.session.add(channel)

    db.session.commit()


def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
