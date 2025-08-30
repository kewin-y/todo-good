import os
from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)

    if (not os.path.isdir(app.instance_path)):
        try:
            os.makedirs(app.instance_path)
        except OSError as err:
            print("OS error: ", err)

    from . import todos
    app.register_blueprint(todos.bp)

    from . import db

    return app
