import type { TodoItem } from "../types/TodoItem";
import { PiNotePencil, PiX } from 'react-icons/pi';
import "./Todo.css";

type TodoProps = {
    todoItem: TodoItem;
    deleteTodo: (id: number) => void;
    toggleTodo: (id: number, compeleted: boolean) => void;
    editTodo: (id: number, oldSummary: string) => void;
};

export default function Todo({ todoItem, deleteTodo, toggleTodo, editTodo }: TodoProps) {
    const {id, completed, summary} = todoItem;
    return <tr className="todo">
        <td><input type="checkbox" checked={completed} id={`todo-${todoItem.id}`} onChange={e => toggleTodo(todoItem.id, e.target.checked)} /></td>
        <td><label>{summary}</label></td>
        <td><button onClick={() => editTodo(id, summary)}><PiNotePencil /></button></td>
        <td><button onClick={() => deleteTodo(id)}><PiX /></button></td>
    </tr>;
}
