from flask import Blueprint, jsonify

views = Blueprint('views', __name__)

@views.route('/')
def home():
    return jsonify(message="Welcome to the Blood Near Me application!")
