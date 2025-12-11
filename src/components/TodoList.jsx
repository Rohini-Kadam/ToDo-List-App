import { useState } from "react";

function TodoList() {
  const [value, setValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const addTodoItem = () => {
    if (value.trim() === "") return;

    const item = {
      id: todoList.length + 1,
      text: value,
      completed: false,
    };

    setTodoList((prev) => [...prev, item]);
    setValue("");
  };

  const toggleCompleted = (id) => {
    setTodoList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id) => {
    setTodoList((prev) => prev.filter((t) => t.id !== id));
  };

  const startEdit = (id, text) => {
    setEditId(id);
    setEditValue(text);
  };

  const saveEdit = (id) => {
    setTodoList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: editValue } : t))
    );
    setEditId(null);
    setEditValue("");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Todo List App</h2>

      <div className="input-group mb-3 w-50 mx-auto">
        <input
          type="text"
          className="form-control"
          value={value}
          placeholder="Enter task here..."
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addTodoItem}>
          Add Task
        </button>
      </div>

      <ul className="list-group w-50 mx-auto">
        {todoList.map((t) => (
          <li
            key={t.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-center gap-2">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleCompleted(t.id)}
              />

              {editId === t.id ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    className="form-control"
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                </>
              ) : (
                <span className={t.completed ? "strikeThrough" : ""}>
                  {t.text}
                </span>
              )}
            </div>

            <div>
              {editId === t.id ? (
                <button
                  className="btn btn-success btn-sm me-2 mb-2"
                  onClick={() => saveEdit(t.id)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => startEdit(t.id, t.text)}
                >
                  Edit
                </button>
              )}

              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteTodo(t.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
