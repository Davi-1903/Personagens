from flask import Blueprint, jsonify
from database.model import Personagem


per_bp = Blueprint('personagem', __name__)


@per_bp.route('/personagens', methods=['GET'])
def get_personagens():
    try:
        personagens = Personagem.query.all()
        personagens = list(map(lambda personagem: personagem.get_json(), personagens))
        return jsonify({'ok': True, 'personagens': personagens}), 200
    except:
        return jsonify({'ok': False, 'message': 'Djabu foi?'}), 500
