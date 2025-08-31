import { type TodoItem } from '../types';
import { PiNotePencil, PiX } from 'react-icons/pi';
import "./Todo.css";
import type { ChangeEvent } from "react";

type TodoProps = {
    todoItem: TodoItem;
    handleDelete: (id: number) => void;
    handleUpdate: (todoItem: TodoItem) => void;
    onEdit: () => void;
};

export default function Todo({ todoItem, handleDelete, handleUpdate, onEdit }: TodoProps) {
    const onDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/todos/${todoItem.id}`, { method: "DELETE" });
            if (!response.ok) {
                throw new Error(`Reponse status: ${response.status}`)
            }
            handleDelete(todoItem.id)
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    };

    const onToggle = (e: ChangeEvent<HTMLInputElement>) => {
        const completed = e.target.checked;
        handleUpdate({ ...todoItem, completed })
    };

    return <tr className="todo">
        <td><input type="checkbox" checked={todoItem.completed} id={`todo-${todoItem.id}`} onChange={onToggle} /></td>
        <td><label>{todoItem.summary}</label></td>
        <td><button onClick={onEdit}><PiNotePencil /></button></td>
        <td><button onClick={onDelete}><PiX /></button></td>
    </tr>;
}
