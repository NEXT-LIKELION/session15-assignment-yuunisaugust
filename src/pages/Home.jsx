// pages/Home.jsx
import { useEffect, useState } from "react";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";
import InputForm from "../components/InputForm.jsx";
import TodoList from "../components/TodoList.jsx";

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "todos"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setTodos(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            );
        });

        return () => unsubscribe();
    }, []);

    return (
        <div>
            <h1>Todo List</h1>
            <InputForm />
            <TodoList todos={todos} />
        </div>
    );
}

export default Home;
