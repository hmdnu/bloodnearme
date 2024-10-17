from ..models.chatbot import *
from flask import request, jsonify
from . import auth

@auth.route('/chat_bot/', methods=['POST'])
def chat_bot():
    data = request.json
    prompt = data.get('prompt')

    if not prompt:
        return jsonify({'error': 'Prompt tidak boleh kosong.'}), 400

    try:
        response = model.generate_content(prompt)
        generated_text = response.text  
        
        return jsonify({'generated_text': generated_text}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500