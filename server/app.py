from flask import Flask, send_from_directory
from personagem.routes import per_bp
import config, os


app = Flask(__name__, static_folder='../client/dist', static_url_path='/')
config.config_app(app, __file__)
app.register_blueprint(per_bp)


# Rota para o React
@app.route('/')
@app.route('/<path:path>')
def serve_react(path=''):
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, app)
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run()
