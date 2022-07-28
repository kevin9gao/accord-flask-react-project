from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired


class DMForm(FlaskForm):
    recipient_id = IntegerField('recipient_id', validators=[DataRequired()])
    dm_convo_id = IntegerField('dm_convo_id', validators=[DataRequired()])
    message_body = StringField('message_body', validators=[DataRequired()])
    created_at = DateTimeField('created_at', validators=[DataRequired()])
