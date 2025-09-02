import { type TodoItem } from '../types';
import { BsTrash3Fill, BsPencilSquare } from 'react-icons/bs';
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

    return <li className="todo">
        <label className="form-control">
            <input
                type="checkbox"
                checked={todoItem.completed}
                id={`todo-${todoItem.id}`}
                onChange={onToggle}
            />
            <span>{todoItem.summary}</span>
        </label>
        <button onClick={onEdit} className='edit'><BsPencilSquare /></button>
        <button onClick={onDelete} className='delete'><BsTrash3Fill /></button>
    </li>;
}
