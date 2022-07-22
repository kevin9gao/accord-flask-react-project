from flask_wtf import FlaskForm
from wtforms import StringField
from app.models import Server
from wtforms.validators import DataRequired

class EditServerForm(FlaskForm):
    name = StringField('Server name', validators=[DataRequired()])
