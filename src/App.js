import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [editId, setEditId] = useState(0);
  const [editTodo, setEditTodo] = useState(""); // New state variable to track edited todo

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId !== 0) {
      // If editId is not 0, update the todo
      const updatedTodos = todos.map((t) =>
        t.id === editId ? { ...t, todo: editTodo } : t
      );
      setTodos(updatedTodos);
      setEditId(0);
      setEditTodo("");
    } else {
      // If editId is 0, add a new todo
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      setTodo("");
    }
  };

  const handleDelete = (id) => {
    const deletedTodo = todos.filter((todo) => todo.id !== id);
    setTodos(deletedTodo);
  };

  const handleEdit = (id) => {
    const item = todos.find((t) => t.id === id);
    setTodo("");
    setEditId(item.id);
    setEditTodo(item.todo);
  };

  return (
    <div className="App">
      <h1>TODO APP</h1>

      <div className="Todo">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={editTodo !== "" ? editTodo : todo}
            onChange={(e) =>
              editId !== 0 ? setEditTodo(e.target.value) : setTodo(e.target.value)
            }
          />
          <button type="submit">{editId !== 0 ? "Update" : "Add"}</button>
        </form>

        <div className="listItems">
          <ul>
            {todos.map((t) => {
              return (
                <li className="items" key={t.id}>
                  <span>{t.todo}</span>

                  <button className="editBtn" onClick={() => handleEdit(t.id)}>
                    Edit
                  </button>
                  <button
                    className="deleteBtn"
                    onClick={() => handleDelete(t.id)}
                  >
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
