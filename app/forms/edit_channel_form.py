from flask_wtf import FlaskForm
from wtforms import StringField
from app.models import Channel
from wtforms.validators import DataRequired

class EditChannelForm(FlaskForm):
    name = StringField('Channel name', validators=[DataRequired()])
