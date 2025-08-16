from flask import Blueprint, jsonify, request
from database.model import db, Personagem


per_bp = Blueprint('personagem', __name__)


@per_bp.route('/personagens', methods=['GET'])
def get_personagens():
    try:
        personagens = Personagem.query.all()
        personagens = list(map(lambda personagem: personagem.get_json(), personagens))
        return jsonify({'ok': True, 'personagens': personagens}), 200
    except:
        return jsonify({'ok': False, 'message': 'Djabu foi?'}), 500


@per_bp.route('/add/personagem', methods=['POST'])
def add_personagem():
    try:
        personagem = request.get_json()
        personagem = Personagem(**personagem)
        db.session.add(personagem)
        db.session.commit()
        return jsonify({'ok': True, 'messagem': 'Tudo certo'}), 200
    except:
        db.session.rollback()
        return jsonify({'ok': False, 'messagem': 'Tudo errado'}), 500