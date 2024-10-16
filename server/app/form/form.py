from wtforms import Form, StringField, PasswordField, validators, IntegerField

class patientRegistrationForm(Form):
    name = StringField('Nama', [validators.Length(min=2, max=50, message='Nama harus antara 2 hingga 50 karakter.')])
    username = StringField('Username', [validators.Length(min=3, max=50, message='Username harus antara 3 hingga 50 karakter.')])
    email = StringField('Email', [validators.Email(message='Format email tidak valid.')])
    phone_number = StringField('Nomor Telepon', [validators.Length(min=11, max=13, message='Nomor telepon harus antara 11 hingga 13 digit.')])
    password1 = PasswordField('Kata Sandi', [
        validators.DataRequired(message='Kata sandi wajib diisi.'),
        validators.EqualTo('password2', message='Kata sandi tidak cocok.')
    ])
    password2 = PasswordField('Konfirmasi Kata Sandi')

class hospitalRegistrationForm(Form):
    name = StringField('Nama', [validators.Length(min=2, max=50, message='Nama harus antara 2 hingga 50 karakter.')])
    address = StringField('Alamat', [validators.Length(min=3, max=255, message='Alamat harus antara 3 hingga 255 karakter.')])
    email = StringField('Email', [validators.Email(message='Format email tidak valid.')])
    phone_number = StringField('Nomor Telepon', [validators.Length(min=11, max=13, message='Nomor telepon harus antara 11 hingga 13 digit.')])
    password1 = PasswordField('Kata Sandi', [
        validators.DataRequired(message='Kata sandi wajib diisi.'),
        validators.EqualTo('password2', message='Kata sandi tidak cocok.')
    ])
    password2 = PasswordField('Konfirmasi Kata Sandi')

class eventOrganizerRegistrationForm(Form):
    name = StringField('Nama', [validators.Length(min=2, max=50, message='Nama harus antara 2 hingga 50 karakter.')])
    username = StringField('Username', [validators.Length(min=3, max=50, message='Username harus antara 3 hingga 50 karakter.')])
    email = StringField('Email', [validators.Email(message='Format email tidak valid.')])
    phone_number = StringField('Nomor Telepon', [validators.Length(min=11, max=13, message='Nomor telepon harus antara 11 hingga 13 digit.')])
    password1 = PasswordField('Kata Sandi', [
        validators.DataRequired(message='Kata sandi wajib diisi.'),
        validators.EqualTo('password2', message='Kata sandi tidak cocok.')
    ])
    password2 = PasswordField('Konfirmasi Kata Sandi')

class bloodStockForm(Form):
    stock = IntegerField('Stok', [
        validators.DataRequired(message='Stok wajib diisi.'),
        validators.NumberRange(min=0, message='Stok harus berupa bilangan bulat positif.')
    ])
