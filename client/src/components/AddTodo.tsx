import { useState, type FormEvent } from "react";
import type { TodoItem } from "../types/TodoItem";

type AddTodoProps = {
    handleAdd: (todo: TodoItem) => void;
}

export default function AddTodo({ handleAdd }: AddTodoProps) {
    const [summary, setSummary] = useState("");

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const body = { summary };

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

    return <>
        <form onSubmit={onSubmit}>
            <input
                type="text"
                value={summary}
                onChange={e => setSummary(e.target.value)}
            />
            <button>add todo</button>
        </form>
    </>;
}
