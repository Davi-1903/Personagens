from flask import Flask
from personagem.routes import per_bp
import config


app = Flask(__name__)
config.config_app(app, __file__)
app.register_blueprint(per_bp)


if __name__ == '__main__':
    app.run()
