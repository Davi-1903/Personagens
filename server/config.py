from flask_cors import CORS
from database import init_database


def config_app(app, file):
    CORS(app, origins=['http://localhost:5173'])
    init_database(app, file)