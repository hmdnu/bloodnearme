from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from ..models.models import db, Blood,BloodStock 
from ..form.form import bloodStockForm,bloodForm
from . import auth
from werkzeug.datastructures import MultiDict

@auth.route('/update_stock/', methods=['POST'])
@login_required  # Require user to be logged in
def update_stock():
    data = request.get_json()  # Get JSON data from the request

    blood_type = data.get('blood_type')  # Get blood type (e.g., 'A+', 'B-')
    action = data.get('action')  # Get action ('add' or 'subtract')
    amount = data.get('amount')  # Get amount to add or subtract

    # Validate action
    if action not in ['add', 'subtract']:
        return jsonify({"error": "Invalid action. Use 'add' or 'subtract'."}), 400
    
    # Validate amount using bloodStockForm
    stock_form = bloodStockForm(data={'stock': amount})
    if not stock_form.validate():
        return jsonify({"error": stock_form.errors}), 400

    # Attempt to get the blood entry based on the blood type and current hospital_id
    blood_entry = Blood.query.filter_by(type=blood_type, hospital_id=current_user.id).first()

    if not blood_entry:
        # If blood entry doesn't exist, create a new one
        new_blood = Blood(
            type=blood_type,
            hospital_id=current_user.id
        )
        db.session.add(new_blood)
        db.session.commit()  # Commit to get the ID for the new blood entry

        # Create a new BloodStock entry with the amount provided
        new_stock = BloodStock(stock=stock_form.stock.data, blood_id=new_blood.id)
        db.session.add(new_stock)
        db.session.commit()

        return jsonify({"message": f"New blood type '{blood_type}' created with stock {stock_form.stock.data}."}), 201

    # If blood entry exists, proceed to update stock
    blood_stock_entry = blood_entry.blood_stock  # Get the associated BloodStock entry

    if action == 'add':
        if blood_stock_entry:
            blood_stock_entry.stock += stock_form.stock.data  # Add stock
        else:
            # If there is no BloodStock entry, create a new one
            new_stock = BloodStock(stock=stock_form.stock.data, blood_id=blood_entry.id)
            db.session.add(new_stock)
    elif action == 'subtract':
        if blood_stock_entry:
            blood_stock_entry.stock -= stock_form.stock.data  # Subtract stock
            if blood_stock_entry.stock < 0:
                blood_stock_entry.stock = 0  # Ensure stock doesn't go negative

    db.session.commit()  # Commit changes to the database
    return jsonify({"message": "Stock updated successfully!"}), 200