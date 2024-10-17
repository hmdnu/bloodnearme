from wtforms import Form, StringField, PasswordField, validators, IntegerField


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

class EventForm(Form):
   eventName = StringField('EventName:', [
       validators.DataRequired(message='Nama event di perlukan !'),
       validators.Length(min=10, max=200, message='Ketentuan nama harus berkisar 10 dan 200 karakter')
   ])
   location = StringField('Location', [
       validators.DataRequired(message='Location is required'),
       validators.Length(min=1, max=200)
   ])
   description = StringField('Description', [
       validators.DataRequired(message='Description is required'),
       validators.Length(min=1, max=400)
   ])
   organizerName = StringField('organizerName', [
       validators.DataRequired(message='Organizer name is required'),
       validators.Length(min=1, max=200)
   ])