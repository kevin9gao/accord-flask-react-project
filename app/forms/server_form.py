from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class ServerForm(FlaskForm):
    name = StringField('Server name', validators=[DataRequired()])
    owner_id = IntegerField('Owner Id', validators=[DataRequired()])
    server_pic_url = StringField('Server Pic URL')
