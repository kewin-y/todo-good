import { useState, type FormEvent } from "react";

export default function AddTodo() {
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

            window.location.reload();
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
