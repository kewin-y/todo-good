from flask import (Blueprint, jsonify, request)

bp = Blueprint("todos", __name__, url_prefix="/todos")

@bp.route("/", methods=["GET"])
def get_all_todos():
    pass

@bp.route("/<int:id>", methods=["GET"])
def get_todo_by_id(id: int):
    pass

@bp.route("/", methods=["POST"])
def create_todo():
    pass

@bp.route("/<int:id>", methods=["DELETE"])
def delete_todo(id: int):
    pass

@bp.route("/<int:id>", methods=["PUT"])
def update_todo(id: int):
    pass

