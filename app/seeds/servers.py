from nis import cat
import app
from app.models import db, Server

def seed_servers():
    group = Server(name="Group12",
     owner_id=1,
     server_pic_url='https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Bundesstra%C3%9Fe_12_number.svg/1280px-Bundesstra%C3%9Fe_12_number.svg.png'
     )
    demo_server = Server(name="Demo Server",
     owner_id=1,
     server_pic_url='https://t4.ftcdn.net/jpg/03/17/25/45/360_F_317254576_lKDALRrvGoBr7gQSa1k4kJBx7O2D15dc.jpg'
     )
    app_academy = Server(name="App Academy",
     owner_id=1,
     server_pic_url='https://lever-client-logos.s3.amazonaws.com/58d4d1db-0eca-41d1-aa71-d8e40214ca16-1532545542352.png'
     )
    tft = Server(name="Teamfight Tactics Megaserver",
     owner_id=2,
     server_pic_url='https://images.contentstack.io/v3/assets/blt76b5e73bfd1451ea/blt7098e6d69328343d/629681f18eeef94572763648/TFT_SET722_Web_SetOverview_Meta_1200x630_FINAL.jpg'
     )
    cats = Server(name="Cats R Cool",
     owner_id=3,
     server_pic_url='https://image.petmd.com/files/styles/article_image/public/choking-heimlich-maneuver-cats.png?VersionId=_YRDUgwBQJNA4hQiXpw9xzeey3uh7nLJ&itok=qqfmr-EO'
     )
    dogs = Server(name="Dogs R Cooler",
     owner_id=1,
     server_pic_url='https://kb.rspca.org.au/wp-content/uploads/2021/07/collie-beach-bokeh.jpg'
     )

    servers = [group, demo_server, app_academy, tft, cats, dogs]

    for server in servers:
        db.session.add(server)

    db.session.commit()

def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
