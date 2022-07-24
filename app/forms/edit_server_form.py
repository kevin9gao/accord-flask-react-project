from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from app.models import Server
from wtforms.validators import DataRequired

class EditServerForm(FlaskForm):
    name = StringField('Server name', validators=[DataRequired()])
    owner_id = IntegerField('Owner ID', validators=[DataRequired()])
