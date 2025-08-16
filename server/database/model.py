from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Personagem(db.Model):
    __tablename__ = 'personagens'

    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    nome = db.Column(db.String(100), nullable=False)
    habilidade = db.Column(db.String(200), nullable=False)