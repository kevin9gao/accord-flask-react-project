from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired


class ChatForm(FlaskForm):
    channel_id = IntegerField('channel_id', validators=[DataRequired()])
    username = StringField('username', validators=[DataRequired()])
    message_body = StringField('message_body', validators=[DataRequired()])
    created_at = DateTimeField('created_at', validators=[DataRequired()])
