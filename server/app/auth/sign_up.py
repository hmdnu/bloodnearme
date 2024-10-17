from flask import request, url_for, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from ..models.models import db, patient, hospital, event_organizer
from ..form.form import patientRegistrationForm, hospitalRegistrationForm, eventOrganizerRegistrationForm
from flask_login import login_user
from werkzeug.datastructures import MultiDict
from . import auth

@auth.route('/sign_up/', methods=['POST'])
def sign_up():
    if request.method == 'POST':
        role = request.json.get('role')
        if not role:
            return jsonify({'error': 'Peran (role) wajib diisi.'}), 400
        
        if role == 'patient':
            return jsonify({'redirect_url': url_for('auth.sign_up_patient')}), 200
        elif role == 'organizer':
            return jsonify({'redirect_url': url_for('auth.sign_up_organizer')}), 200
        elif role == 'hospital':
            return jsonify({'redirect_url': url_for('auth.sign_up_hospital')}), 200
        else:
            return jsonify({'error': 'Peran tidak valid.'}), 400

    return jsonify({'message': 'Pilih peran terlebih dahulu.'}), 200

@auth.route('/sign_up/patient/', methods=['POST'])
def sign_up_patient():
    if request.method == 'POST':
        data = request.json
        if not data:
            return jsonify({'error': 'Tidak ada data JSON yang diberikan.'}), 400

        form = patientRegistrationForm(MultiDict(data))
        if form.validate():
            name = form.name.data
            username = form.username.data
            phone_number = form.phone_number.data
            email = form.email.data
            password1 = form.password1.data

            if patient.query.filter_by(username=username).first():
                return jsonify({'error': 'Username sudah digunakan. Pilih username lain.'}), 400

            if patient.query.filter_by(email=email).first():
                return jsonify({'error': 'Email sudah terdaftar. Gunakan email lain.'}), 400

            if patient.query.filter_by(phone_number=phone_number).first():
                return jsonify({'error': 'Nomor telepon sudah terdaftar. Gunakan nomor lain.'}), 400

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

            return jsonify({'message': 'Akun berhasil dibuat!'}), 201

        return jsonify({'error': 'Data tidak valid.'}), 400

    return jsonify({'message': 'Kirim permintaan POST untuk mendaftar sebagai pasien.'}), 200

@auth.route('/sign_up/hospital/', methods=['POST'])
def sign_up_hospital():
    if request.method == 'POST':
        data = request.json
        if not data:
            return jsonify({'error': 'Tidak ada data JSON yang diberikan.'}), 400

        form = hospitalRegistrationForm(MultiDict(data))
        if form.validate():
            name = form.name.data
            address = form.address.data
            email = form.email.data
            phone_number = form.phone_number.data
            password1 = form.password1.data

            if hospital.query.filter_by(email=email).first():
                return jsonify({'error': 'Email sudah terdaftar. Gunakan email lain.'}), 400

            if hospital.query.filter_by(phone_number=phone_number).first():
                return jsonify({'error': 'Nomor telepon sudah terdaftar. Gunakan nomor lain.'}), 400

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

            return jsonify({'message': 'Akun berhasil dibuat!'}), 201

        return jsonify({'error': 'Data tidak valid.'}), 400

    return jsonify({'message': 'Kirim permintaan POST untuk mendaftar sebagai rumah sakit.'}), 200

@auth.route('/sign_up/event_organizer/', methods=['POST'])
def sign_up_event_organizer():
    if request.method == 'POST':
        data = request.json
        if not data:
            return jsonify({'error': 'Tidak ada data JSON yang diberikan.'}), 400

        form = eventOrganizerRegistrationForm(MultiDict(data))
        if form.validate():
            name = form.name.data
            username = form.username.data
            phone_number = form.phone_number.data
            email = form.email.data
            password1 = form.password1.data

            if event_organizer.query.filter_by(username=username).first():
                return jsonify({'error': 'Username sudah digunakan. Pilih username lain.'}), 400

            if event_organizer.query.filter_by(email=email).first():
                return jsonify({'error': 'Email sudah terdaftar. Gunakan email lain.'}), 400

            if event_organizer.query.filter_by(phone_number=phone_number).first():
                return jsonify({'error': 'Nomor telepon sudah terdaftar. Gunakan nomor lain.'}), 400

            new_organizer = event_organizer(
                name=name,
                username=username,
                phone_number=phone_number,
                email=email,
                password_hash=generate_password_hash(password1, method='pbkdf2:sha256')
            )

            db.session.add(new_organizer)
            db.session.commit()
            login_user(new_organizer)

            return jsonify({'message': 'Akun berhasil dibuat!'}), 201

        return jsonify({'error': 'Data tidak valid.'}), 400

    return jsonify({'message': 'Kirim permintaan POST untuk mendaftar sebagai event organizer.'}), 200
