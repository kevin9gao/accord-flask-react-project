from flask_wtf import FlaskForm
from wtforms import StringField
from app.models import Server

class ServerForm(FlaskForm):
    