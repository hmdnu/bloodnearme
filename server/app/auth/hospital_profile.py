from flask import jsonify
from ..models.models import hospital,Blood
from . import auth


@auth.route('/hospital/<string:hospital_name>/', methods=['GET'])
def hospital_profile(hospital_name):
    hospital_name = hospital_name.replace('-', ' ')
    
    hospitaldb = hospital.query.filter_by(name=hospital_name).first()
    
    if not hospitaldb:
        return jsonify({"error": "Hospital not found."}), 404  

    blood_types = Blood.query.filter_by(hospital_id=hospitaldb.id).all()

    stock_data = [
        {
            "blood_type": blood.type,
            "stock": blood.blood_stock.stock if blood.blood_stock else 0
        }
        for blood in blood_types
    ]

    return jsonify({
        "hospital": hospitaldb.name,
        "address": hospitaldb.address,
        "email": hospitaldb.email,
        "contact": hospitaldb.phone_number,
        "stock_data": stock_data
    })



