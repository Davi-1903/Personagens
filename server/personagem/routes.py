from flask import Blueprint, jsonify, request
from database.model import db, Personagem


per_bp = Blueprint('personagem', __name__, url_prefix='/personagens')


@per_bp.route('/', methods=['GET'])
def get_personagens():
    try:
        personagens = Personagem.query.all()
        personagens = list(map(lambda personagem: personagem.get_json(), personagens))
        return jsonify({'ok': True, 'personagens': personagens}), 200
    except:
        return jsonify({'ok': False, 'message': 'Djabu foi?'}), 500


@per_bp.route('/', methods=['POST'])
def add_personagem():
    try:
        personagem = request.get_json()
        personagem = Personagem(**personagem)
        db.session.add(personagem)
        db.session.commit()
        return jsonify({'ok': True, 'message': 'Personagem adicionado com sucesso'}), 200
    except:
        db.session.rollback()
        return jsonify({'ok': False, 'message': 'Vix... Probleminha interno...'}), 500


@per_bp.route('/<int:id>', methods=['PATCH'])
def update_personagem(id):
    try:
        data = request.get_json()
        personagem = db.session.get(Personagem, id)
        personagem.nome = data.get('nome')
        personagem.habilidade = data.get('habilidade')
        db.session.commit()
        return jsonify({'ok': True, 'message': 'Atualizações realizadas'}), 200
    except:
        db.session.rollback()
        return jsonify({'ok': False, 'message': 'Ocorreu uma desgraça interna aqui'}), 500


@per_bp.route('/<int:id>', methods=['DELETE'])
def delete_personagem(id):
    try:
        personagem = db.session.get(Personagem, id)
        db.session.delete(personagem)
        db.session.commit()
        return jsonify({'ok': True, 'message': 'Personagem deletado com sucesso'}), 200
    except:
        db.session.rollback()
        return jsonify({'ok': False, 'message': 'Ocorreu algum erro'}), 500
