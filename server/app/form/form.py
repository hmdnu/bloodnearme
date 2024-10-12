from wtforms import Form, StringField, PasswordField, validators,IntegerField

class patientRegistrationForm(Form):
    name = StringField('Name', [validators.Length(min=2, max=50)])
    username = StringField('Username', [validators.Length(min=3, max=50)])
    email = StringField('Email', [validators.Email()])
    phone_number = StringField('Phone Number', [validators.Length(min=11, max=13)])
    password1 = PasswordField('Password', [
        validators.DataRequired(),
        validators.EqualTo('password2', message='Passwords must match.')
    ])
    password2 = PasswordField('Confirm Password')
    
class hospitalRegistrationForm(Form):
    name = StringField('Name', [validators.Length(min=2, max=50)])
    address = StringField('Address', [validators.Length(min=3, max=255)])
    email = StringField('Email', [validators.Email()])
    phone_number = StringField('Phone Number', [validators.Length(min=11, max=13)])
    password1 = PasswordField('Password', [
        validators.DataRequired(),
        validators.EqualTo('password2', message='Passwords must match.')
    ])
    password2 = PasswordField('Confirm Password')

class eventOrganizerRegistrationForm(Form):
    name = StringField('Name', [validators.Length(min=2, max=50)])
    username = StringField('Username', [validators.Length(min=3, max=50)])
    email = StringField('Email', [validators.Email()])
    phone_number = StringField('Phone Number', [validators.Length(min=11, max=13)])
    password1 = PasswordField('Password', [
        validators.DataRequired(),
        validators.EqualTo('password2', message='Passwords must match.')
    ])
    password2 = PasswordField('Confirm Password')

    
class bloodStockForm(Form):
    stock = IntegerField('Stock', [
        validators.DataRequired(message='Stock is required.'),
        validators.NumberRange(min=0, message='Stock must be a positive integer.')
    ])