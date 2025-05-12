// components/TodoItem.jsx
import { useState } from "react";
import { db } from "../lib/firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

function TodoItem({ todo }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);
    const [editDetail, setEditDetail] = useState(todo.detail);
    const [editDeadline, setEditDeadline] = useState(todo.deadline);

    const handleDelete = async () => {
        await deleteDoc(doc(db, "todos", todo.id));
    };

    const handleUpdate = async () => {
        const todoRef = doc(db, "todos", todo.id);
        await updateDoc(todoRef, {
            title: editTitle,
            detail: editDetail,
            deadline: editDeadline,
        });
        setIsEditing(false);
    };

    return (
        <li className="todo-item">
            {isEditing ? (
                <div className="todo-form">
                    <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder="제목"
                    />
                    <textarea
                        value={editDetail}
                        onChange={(e) => setEditDetail(e.target.value)}
                        placeholder="상세 내용"
                    />
                    <input
                        type="date"
                        value={editDeadline}
                        onChange={(e) => setEditDeadline(e.target.value)}
                    />
                    <div className="todo-actions">
                        <button className="btn" onClick={handleUpdate}>
                            저장
                        </button>
                        <button
                            className="btn"
                            onClick={() => setIsEditing(false)}
                        >
                            취소
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <h3>{todo.title}</h3>
                    <p>{todo.detail}</p>
                    <p>마감일: {todo.deadline}</p>
                    <div className="todo-actions">
                        <button
                            className="btn btn-edit"
                            onClick={() => setIsEditing(true)}
                        >
                            수정
                        </button>
                        <button
                            className="btn btn-delete"
                            onClick={handleDelete}
                        >
                            삭제
                        </button>
                    </div>
                </>
            )}
        </li>
    );
}

export default TodoItem;
