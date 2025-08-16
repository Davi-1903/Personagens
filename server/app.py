from flask import Flask
from flask_cors import CORS
import config


app = Flask(__name__)
config.config_app(app, __file__)
CORS(app)


if __name__ == '__main__':
    app.run()
