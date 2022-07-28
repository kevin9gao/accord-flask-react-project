from email import message
from venv import create
from app.models import db, DirectMessage
from datetime import datetime


def seed_dms():
    msg1 = DirectMessage(sender_id=1, recipient_id=2, message_body="hello, this is a temporary message", created_at=datetime.now() )
    msg2 = DirectMessage(sender_id=2, recipient_id=1, message_body="hi, temp msg", created_at=datetime.now() )
    db.session.add(msg1)
    db.session.add(msg2)
    db.session.commit()

def undo_dms():
    db.session.execute('TRUNCATE direct_messages RESTART IDENTITY CASCADE;')
    db.session.commit()
