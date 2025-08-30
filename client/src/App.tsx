import AddTodo from "./components/AddTodo";
import { type TodoItem } from "./types/TodoItem";
import { useRef, useState, useEffect } from "react";
import Todo from "./components/Todo";
import EditTodoModal from "./components/EditTodoModal";

export default function App() {
    const effectRun = useRef(false);
    const [todos, setTodos] = useState<TodoItem[]>([]);

    const [isModalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number>(0);
    const [editingOldSummary, setEditingOldSummary] = useState<string>("");

    const openModal = (id: number, oldSummary: string) => {
        setEditingId(id);
        setEditingOldSummary(oldSummary);
        setModalOpen(true);
    };

    const modalCancel = () => setModalOpen(false);

    const updateTodo = async (id: number, summary: string) => {
        const body = { summary };
        try {
            const response = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            });
            if (!response.ok) {
                throw new Error(`Reponse status: ${response.status}`)
            }
            setTodos(todos.map(todo => todo.id === id ? { ...todo, summary } : todo))
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    };

    const deleteTodo = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:5000/todos/${id}`, { method: "DELETE" });
            if (!response.ok) {
                throw new Error(`Reponse status: ${response.status}`)
            }
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }

    const toggleTodo = async (id: number, completed: boolean) => {
        const body = { completed };

        try {
            const response = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            });
            if (!response.ok) {
                throw new Error(`Reponse status: ${response.status}`)
            }
            setTodos(todos.map(todo => todo.id === id ? { ...todo, completed } : todo))
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos");

            if (!response.ok) {
                throw new Error(`Reponse status: ${response.status}`)
            }

            const result = await response.json();
            setTodos(result);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    };

    useEffect(() => {
        // Prevent double-running in strict mode
        if (!effectRun.current) {
            getTodos();
            effectRun.current = true;
        }
    }, []);

    return <>
        <AddTodo />
        <EditTodoModal open={isModalOpen} modalCancel={modalCancel} onDone={updateTodo} editingId={editingId} oldSummary={editingOldSummary} />
        <hr />
        <table className="todo-list">
            <tbody>
                {todos.map((todoItem) => (
                    <Todo todoItem={todoItem} deleteTodo={deleteTodo} toggleTodo={toggleTodo} editTodo={openModal} key={todoItem.id} />
                ))}
            </tbody>
        </table>
    </>;
}
