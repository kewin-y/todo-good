from . import db
from flask import (Blueprint, jsonify, request, abort)

bp = Blueprint("todos", __name__, url_prefix="/todos")

@bp.route("/", methods=["GET"])
def get_all_todos():
    with db.pool.connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM todos")

            conn.commit()
            return jsonify(cur.fetchall())

@bp.route("/<int:todo_id>", methods=["GET"])
def get_todo_by_id(todo_id: int):
    with db.pool.connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM todos WHERE id=(%s)", (todo_id,))

            conn.commit()
            return jsonify(cur.fetchone())

@bp.route("/", methods=["POST"])
def create_todo():
    data = request.get_json()

    summary: str | None = data.get("summary", None)

    if (summary is None):
        abort(400)

    with db.pool.connection() as conn:
        with conn.cursor() as cur:
            cur.execute("INSERT INTO todos (summary, completed) VALUES (%s, FALSE) RETURNING *", (summary,))

            conn.commit()
            return jsonify(cur.fetchone())

@bp.route("/<int:todo_id>", methods=["DELETE"])
def delete_todo(todo_id: int):
    with db.pool.connection() as conn:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM todos WHERE id=%s", (todo_id,))

            conn.commit()
            return jsonify("todo was deleted")


@bp.route("/<int:todo_id>", methods=["PATCH"])
def update_todo(todo_id: int):
    data = request.get_json()

    summary: str | None = data.get("summary", None)
    completed: bool | None = data.get("completed", None)

    with db.pool.connection() as conn:
        with conn.cursor() as cur:
            if completed is not None:
                cur.execute("UPDATE todos SET completed=%s WHERE id=%s", (completed, todo_id))
            if summary is not None:
                cur.execute("UPDATE todos SET summary=%s WHERE id=%s", (summary, todo_id))

            conn.commit()
            return jsonify("todo was updated")

