from database import init_database


def config_app(app):
    init_database(app)