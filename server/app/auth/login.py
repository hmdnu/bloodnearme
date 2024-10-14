from flask import request, jsonify
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta
from ..models.models import patient, hospital, event_organizer
from . import auth

@auth.route('/login/', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    # Cek di tabel patient
    user = patient.query.filter_by(email=email).first()
    if user and check_password_hash(user.password_hash, password):
        access_token = create_access_token(
            identity={'id': user.id, 'role': 'patient'},
            expires_delta=timedelta(hours=1)  # Token valid selama 1 jam
        )
        return jsonify(access_token=access_token), 200

    # Cek di tabel hospital
    user = hospital.query.filter_by(email=email).first()
    if user and check_password_hash(user.password_hash, password):
        access_token = create_access_token(
            identity={'id': user.id, 'role': 'hospital'},
            expires_delta=timedelta(hours=1)
        )
        return jsonify(access_token=access_token), 200

    # Cek di tabel event_organizer
    user = event_organizer.query.filter_by(email=email).first()
    if user and check_password_hash(user.password_hash, password):
        access_token = create_access_token(
            identity={'id': user.id, 'role': 'event_organizer'},
            expires_delta=timedelta(hours=1)
        )
        return jsonify(access_token=access_token), 200

    return jsonify({'error': 'Login failed. Check your credentials.'}), 401

@auth.route('/logout/', methods=['POST'])
@jwt_required()
def logout():
    #belum kepikiran
    return jsonify({'message': 'Logged out successfully.'}), 200
