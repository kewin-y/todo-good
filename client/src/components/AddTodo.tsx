import { useState, type FormEvent } from "react";
import type { TodoItem } from "../types";
import "./AddTodo.css";

type AddTodoProps = {
    handleAdd: (todo: TodoItem) => void;
}

export default function AddTodo({ handleAdd }: AddTodoProps) {
    const [summary, setSummary] = useState("");

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const body = { summary };
        setSummary("");

        try {
            const response = await fetch("http://localhost:5000/todos/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error(`Reponse status: ${response.status}`)
            }

            const todo = await response.json();

            handleAdd(todo);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }

    return <form onSubmit={onSubmit} className="add-todo-form">
        <input
            type="text"
            value={summary}
            onChange={e => setSummary(e.target.value)}
            className="add-todo-input"
        />
        <button>add todo</button>
    </form>;
}
