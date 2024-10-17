from flask import request, jsonify
from werkzeug.security import check_password_hash
from ..models.models import patient, hospital, event_organizer
from flask_login import login_user, logout_user, login_required
from . import auth


@auth.route('/login/', methods=['POST'])
def login():
    identifier = request.json.get('identifier')
    password = request.json.get('password')

    user = patient.query.filter(
        (patient.username == identifier) | (patient.email == identifier)
    ).first()

    if user and check_password_hash(user.password_hash, password):
        login_user(user)
        return jsonify({'message': 'Login successful!'}), 200

    user = hospital.query.filter(
        (hospital.email == identifier)
    ).first()

    if user and check_password_hash(user.password_hash, password):
        login_user(user)
        return jsonify({'message': 'Login successful!'}), 200

    user = event_organizer.query.filter(
        (event_organizer.username == identifier) | (event_organizer.email == identifier)
    ).first()

    if user and check_password_hash(user.password_hash, password):
        login_user(user)
        return jsonify({'message': 'Login successful!'}), 200

    return jsonify({'error': 'Login failed. Check your credentials.'}), 401


@auth.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully.'}), 200