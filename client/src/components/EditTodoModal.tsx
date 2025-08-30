import { useEffect, useState, type FormEvent } from "react";
import "./EditTodoModal.css";

type EditTodoModalProps = {
    open: boolean;
    editingId: number;
    oldSummary: string;
    modalCancel: () => void;
    onDone: (id: number, summary: string) => void;
}

export default function EditTodoModal({ open, editingId, oldSummary: editingOldSummary, modalCancel, onDone }: EditTodoModalProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && open) {
                modalCancel();
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open]);

    const [summary, setSummary] = useState("");

    const onSubmitForm = (e: FormEvent) => {
        e.preventDefault();
        onDone(editingId, summary);
        modalCancel();
    };

    if (!open) return null;

    return <div className="modal">
        <div className="modal-content">
            <div className="modal-header">
                editing todo: {editingOldSummary}
                <span className="close" onClick={() => modalCancel()}>&times;</span>
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
    </div>;
}
