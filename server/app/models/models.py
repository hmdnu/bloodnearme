from flask_login import UserMixin

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class patient(db.Model,UserMixin):
    __tablename__ = 'patient'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=False, nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    phone_number=db.Column(db.String(13), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def __repr__(self):
        return '<patient %r>' % self.username



class hospital(db.Model,UserMixin):
    __tablename__ = 'hospital'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=False, nullable=False)
    address = db.Column(db.String(255), unique=False, nullable=False)
    phone_number=db.Column(db.String(13), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def __repr__(self):
        return '<hospital %r>' % self.email

class event_organizer(db.Model,UserMixin):
    __tablename__ = 'event_organizer'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=False, nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    phone_number=db.Column(db.String(13), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def __repr__(self):
        return '<event_organizer %r>' % self.username