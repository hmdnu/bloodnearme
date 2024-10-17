from flask import request,jsonify

from ..form.form import EventForm
from ..models.models import db,event
from . import auth

@auth.route('/add', methods=["POST"])
def add():
    data = request.get_json()

    eventName = data.get('eventName')
    location = data.get('location')
    description = data.get('description')
    organizerName= data.get('organizerName')

    if not eventName or not location or not description:
        return jsonify({"error": "All fields (eventName, location, description) are required."}), 400

        # Buat form validasi untuk event
    event_form = EventForm(data={'eventName': eventName, 'location': location, 'description': description, 'organizerName':organizerName})

    if not event_form.validate():  # Validasi menggunakan form
        return jsonify({"error": event_form.errors}), 400


    # Buat event baru jika tidak ada event yang sama
    new_event = event(
        eventName=event_form.eventName.data,
        location=event_form.location.data,
        description=event_form.description.data,
        organizerName=event_form.description.data
    )

    # Simpan event ke database
    db.session.add(new_event)
    db.session.commit()

    return jsonify({"message": f"New event '{eventName}' created successfully!"}), 201







