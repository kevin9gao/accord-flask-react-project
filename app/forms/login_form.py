from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email_username = field.data
    user_email = User.query.filter(User.email == email_username).first()
    user_username = User.query.filter(User.username == email_username).first()
    user = user_email if user_email else user_username
    print('user_email', user_email)
    print('user_username', user_username)
    print('user', user)
    if not user:
        raise ValidationError('Invalid credentials.')


def password_matches(form, field):
    # Checking if password matches
    print('hitting backend login_form.py')
    password = field.data
    # email = form.data['email']
    # user = User.query.filter(User.email == email).first()
    email_username = form.data['email_username']
    user = User.query.filter(User.email == email_username).first()
#  or User.username == email_username
    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        raise ValidationError('Password was incorrect.')


class LoginForm(FlaskForm):
    email_username = StringField('Email/Username', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[
                           DataRequired(), password_matches])
