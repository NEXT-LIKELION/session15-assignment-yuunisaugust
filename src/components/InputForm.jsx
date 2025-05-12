// components/InputForm.jsx
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

function InputForm() {
    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");
    const [deadline, setDeadline] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        await addDoc(collection(db, "todos"), {
            title,
            detail,
            deadline,
            createdAt: new Date().toISOString(),
        });

        setTitle("");
        setDetail("");
        setDeadline("");
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="할 일 제목"
                required
            />
            <textarea
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                placeholder="상세 내용"
            />
            <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
            />
            <button type="submit">추가하기</button>
        </form>
    );
}

export default InputForm;
