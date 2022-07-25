from flask_wtf import FlaskForm
from wtforms import IntegerField
from app.models import Server
from wtforms.validators import DataRequired


class JoinServerForm(FlaskForm):
    user_id = IntegerField('Server name', validators=[DataRequired()])
    server_id = IntegerField('Owner ID', validators=[DataRequired()])
