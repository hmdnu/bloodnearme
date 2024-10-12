from flask import  request, url_for, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from ..models.models import db, patient, hospital,event_organizer
from ..form.form import patientRegistrationForm, hospitalRegistrationForm,eventOrganizerRegistrationForm
from flask_login import login_user, logout_user, login_required
from werkzeug.datastructures import MultiDict
from . import auth



@auth.route('/post/<int:post_id>')
def show_post(post_id):
    return f'Post {post_id}'

@auth.route('/sign_up/', methods=['POST'])
def sign_up():
    if request.method == 'POST':
        role = request.json.get('role')
        if not role:
            return jsonify({'error': 'Role is required'}), 400
        
        if role == 'patient':
            return jsonify({'redirect_url': url_for('auth.sign_up_patient')}), 200
        elif role == 'organizer':
            return jsonify({'redirect_url': url_for('auth.sign_up_organizer')}), 200
        elif role == 'hospital':
            return jsonify({'redirect_url': url_for('auth.sign_up_hospital')}), 200
        else:
            return jsonify({'error': 'Invalid role selected'}), 400
    
    return jsonify({'message': 'Please select a role'}), 200

@auth.route('/sign_up/patient/', methods=['POST']) 
def sign_up_patient():
    if request.method == 'POST':
        data = request.json
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400

        form = patientRegistrationForm(MultiDict(data))
        if form.validate():
            name = form.name.data
            username = form.username.data
            phone_number = form.phone_number.data
            email = form.email.data
            password1 = form.password1.data
            
            existing_user = patient.query.filter_by(username=username).first()
            if existing_user:
                return jsonify({'error': 'Username is already taken. Please choose another one.'}), 400
            
            existing_email = patient.query.filter_by(email=email).first()
            if existing_email:
                return jsonify({'error': 'Email is already registered. Please use a different email.'}), 400

            existing_phone = patient.query.filter_by(phone_number=phone_number).first()
            if existing_phone:
                return jsonify({'error': 'Phone number is already registered. Please use a different number.'}), 400
            
            new_patient = patient(
                name=name,
                username=username,
                phone_number=phone_number,
                email=email,
                password_hash=generate_password_hash(password1, method='pbkdf2:sha256')
            )
            
            db.session.add(new_patient)
            db.session.commit()
            login_user(new_patient)
            
            return jsonify({'message': 'Account created successfully!'}), 201

        return jsonify({'error': 'Invalid data'}), 400
    
    return jsonify({'message': 'Send a POST request to sign up a patient.'}), 200

@auth.route('/sign_up/hospital/', methods=['POST'])
def sign_up_hospital():
    if request.method == 'POST':
        data = request.json
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400

        form = hospitalRegistrationForm(MultiDict(data))
        if form.validate():
            name = form.name.data
            address = form.address.data
            email = form.email.data
            phone_number = form.phone_number.data
            password1 = form.password1.data
            
            existing_email = hospital.query.filter_by(email=email).first()
            if existing_email:
                return jsonify({'error': 'Email is already registered. Please use a different email.'}), 400

            existing_phone = hospital.query.filter_by(phone_number=phone_number).first()
            if existing_phone:
                return jsonify({'error': 'Phone number is already registered. Please use a different number.'}), 400
            
            new_hospital = hospital(
                name=name,
                phone_number=phone_number,
                address=address,
                email=email,
                password_hash=generate_password_hash(password1, method='pbkdf2:sha256')
            )
            
            
            db.session.add(new_hospital)
            db.session.commit()
            login_user(new_hospital)
            
            return jsonify({'message': 'Account created successfully!'}), 201

        return jsonify({'error': 'Invalid data'}), 400
    
    return jsonify({'message': 'Send a POST request to sign up a hospital.'}), 200

@auth.route('/sign_up/event_organizer/', methods=['POST']) 
def sign_up_event_organizer():
    if request.method == 'POST':
        data = request.json
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400

        form = eventOrganizerRegistrationForm(MultiDict(data))
        if form.validate():
            name = form.name.data
            username = form.username.data
            phone_number = form.phone_number.data
            email = form.email.data
            password1 = form.password1.data
            
            existing_user = event_organizer.query.filter_by(username=username).first()
            if existing_user:
                return jsonify({'error': 'Username is already taken. Please choose another one.'}), 400
            
            existing_email = event_organizer.query.filter_by(email=email).first()
            if existing_email:
                return jsonify({'error': 'Email is already registered. Please use a different email.'}), 400

            existing_phone = event_organizer.query.filter_by(phone_number=phone_number).first()
            if existing_phone:
                return jsonify({'error': 'Phone number is already registered. Please use a different number.'}), 400
            
            new_patient = event_organizer(
                name=name,
                username=username,
                phone_number=phone_number,
                email=email,
                password_hash=generate_password_hash(password1, method='pbkdf2:sha256')
            )
            
            db.session.add(new_patient)
            db.session.commit()
            login_user(new_patient)
            
            return jsonify({'message': 'Account created successfully!'}), 201

        return jsonify({'error': 'Invalid data'}), 400
    
    return jsonify({'message': 'Send a POST request to sign up a event organizer.'}), 200

