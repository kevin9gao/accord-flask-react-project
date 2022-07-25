from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from app.models import Channel
from wtforms.validators import DataRequired

class EditChannelForm(FlaskForm):
    name = StringField('Channel name', validators=[DataRequired()])
    server_id = IntegerField('Server Id', validators=[DataRequired()])
