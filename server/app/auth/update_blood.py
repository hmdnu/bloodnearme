from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.models import db, Blood, BloodStock
from ..form.form import bloodStockForm
from . import auth

@auth.route('/update_stock/', methods=['POST'])
@jwt_required()  
def update_stock():
    user = get_jwt_identity()  
    if user['role'] != 'hospital':
        return jsonify({"error": "Access denied. Only hospitals can update stock."}), 403

    data = request.get_json()
    blood_type = data.get('blood_type')
    action = data.get('action')
    amount = data.get('amount')

    if action not in ['add', 'subtract']:
        return jsonify({"error": "Invalid action. Use 'add' or 'subtract'."}), 400

    stock_form = bloodStockForm(data={'stock': amount})
    if not stock_form.validate():
        return jsonify({"error": stock_form.errors}), 400

    blood_entry = Blood.query.filter_by(type=blood_type, hospital_id=user['id']).first()

    if not blood_entry:
        new_blood = Blood(type=blood_type, hospital_id=user['id'])
        db.session.add(new_blood)
        db.session.commit()

        new_stock = BloodStock(stock=stock_form.stock.data, blood_id=new_blood.id)
        db.session.add(new_stock)
        db.session.commit()

        return jsonify({"message": f"New blood type '{blood_type}' created with stock {stock_form.stock.data}."}), 201

    blood_stock_entry = blood_entry.blood_stock

    if action == 'add':
        if blood_stock_entry:
            blood_stock_entry.stock += stock_form.stock.data
        else:
            new_stock = BloodStock(stock=stock_form.stock.data, blood_id=blood_entry.id)
            db.session.add(new_stock)

    elif action == 'subtract':
        if blood_stock_entry:
            blood_stock_entry.stock -= stock_form.stock.data
            if blood_stock_entry.stock < 0:
                blood_stock_entry.stock = 0

    db.session.commit()
    return jsonify({"message": "Stock updated successfully!"}), 200
