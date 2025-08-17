from database import init_database


def config_app(app, file):
    init_database(app, file)