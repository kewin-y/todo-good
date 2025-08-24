import os

from flask import Flask

def create_app():
    app = Flask(__name__, instance_relative_config=True)

    if (not os.path.isdir(app.instance_path)):
        try:
            os.makedirs(app.instance_path)
        except OSError as err:
            print("OS error: ", err)

    from . import todos
    app.register_blueprint(todos.bp)

    return app
