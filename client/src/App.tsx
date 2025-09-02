import AddTodo from "./components/AddTodo";
import { type TodoItem } from "./types";
import { useRef, useEffect, useReducer, useState } from "react";
import Todo from "./components/Todo";
import EditTodoModal from "./components/EditTodoModal";
import "./App.css";

type TodoAction =
    | { type: 'INIT'; payload: { allTodos: TodoItem[] } }
    | { type: 'ADD_TODO'; payload: { todo: TodoItem } }
    | { type: 'UPDATE_TODO'; payload: { todo: TodoItem } }
    | { type: 'DELETE_TODO'; payload: { id: number } };

function todoItemsReducer(todoItems: TodoItem[], action: TodoAction) {
    switch (action.type) {
        case "INIT": {
            return action.payload.allTodos;
        }
        case "ADD_TODO": {
            return [...todoItems, action.payload.todo];
        }
        case "DELETE_TODO": {
            return todoItems.filter(todo => todo.id !== action.payload.id)
        }
        case "UPDATE_TODO": {
            return todoItems.map(todo => todo.id === action.payload.todo.id ? action.payload.todo : todo);
        }
        default:
            return [...todoItems];
    }
}

export default function App() {
    const [todoItems, dispatch] = useReducer(todoItemsReducer, []);
    const [editingTodo, setEditingTodo] = useState<TodoItem>();
    const [modalOpen, setModalOpen] = useState(false);
    const effectRun = useRef(false);

    useEffect(() => {
        if (!effectRun.current) {
            fetch("http://localhost:5000/todos").then(response => {
                if (!response.ok) {
                    throw new Error(`Reponse status: ${response.status}`)
                }
                return response.json();
            }).then(data => dispatch({
                type: "INIT",
                payload: { allTodos: data }
            })).catch(error => {
                if (error instanceof Error) {
                    console.log(error.message)
                }
            });
            effectRun.current = true;
        }
    }, []);

    const handleAdd = (todo: TodoItem) => {
        dispatch({ type: "ADD_TODO", payload: { todo: todo } });
    };

    const handleDelete = (id: number) => {
        dispatch({ type: "DELETE_TODO", payload: { id: id } })
    };

    const handleUpdate = async (todo: TodoItem) => {
        const { id, ...body } = todo;

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

            dispatch({ type: "UPDATE_TODO", payload: { todo: todo } });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }

    }

    return <div className="container">
        <AddTodo handleAdd={handleAdd} />
        <hr />
        <EditTodoModal
            open={modalOpen}
            todo={editingTodo}
            modalClose={() => { setModalOpen(false) }}
            handleUpdate={handleUpdate}
        />
        <ul className="todo-list">
            {todoItems.map((todoItem) => (
                <Todo
                    todoItem={todoItem}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                    onEdit={() => {
                        setEditingTodo(todoItem);
                        setModalOpen(true);
                    }}
                    key={todoItem.id}
                />
            ))}
        </ul>
    </div>;
}
