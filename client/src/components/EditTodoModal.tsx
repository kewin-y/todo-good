import { useEffect, useState, type FormEvent } from "react";
import "./EditTodoModal.css";
import type { TodoItem } from "../types";

type EditTodoModalProps = {
    open: boolean;
    todo: TodoItem | undefined;
    modalClose: () => void;
    handleUpdate: (todoItem: TodoItem) => void;
}

export default function EditTodoModal({ open, todo, modalClose, handleUpdate }: EditTodoModalProps) {
    const [summary, setSummary] = useState("");

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && open) {
                setSummary("");
                modalClose();
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open]);


    const onSubmitForm = (e: FormEvent) => {
        e.preventDefault();
        if (todo)
            handleUpdate({ ...todo, summary })
        setSummary("");
        modalClose();
    };

    return ((todo && open) && <div className="modal">
        <div className="modal-content">
            <div className="modal-header">
                editing todo: {todo.summary}
                <span className="close" onClick={() => {
                    setSummary("");
                    modalClose();
                }}>&times;</span>
            </div>
            <form className="modal-form" onSubmit={onSubmitForm}>
                <input
                    type="text"
                    value={summary}
                    onChange={e => setSummary(e.target.value)}
                />
                <button>done</button>
            </form>
        </div>
    </div>);
}
