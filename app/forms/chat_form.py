from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired
from app.models import LiveChatMessage


class ChatForm(FlaskForm):
    channel_id = IntegerField('channel_id', validators=[DataRequired()])
    username = StringField('username', validators=[DataRequired()])
    message_body = StringField('message_body', validators=[DataRequired()])
    created_at = DateTimeField('created_at', format="%Y-%m-%d %H:%M:%S", validators=[DataRequired()])
