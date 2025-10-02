import { useState, useEffect } from 'react';
import api from '../services/api';

function TodoList({ onLogout }) {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.getTodos();
      setTodos(data);
    } catch (err) {
      if (err.message === 'Unauthorized') {
        onLogout();
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;

    setError('');
    try {
      const newTodo = await api.createTodo(newTodoText);
      setTodos([...todos, newTodo]);
      setNewTodoText('');
    } catch (err) {
      if (err.message === 'Unauthorized') {
        onLogout();
      } else {
        setError(err.message);
      }
    }
  };

  const handleToggleComplete = async (todo) => {
    setError('');
    try {
      const updated = await api.updateTodo(todo.id, { completed: !todo.completed });
      setTodos(todos.map(t => t.id === todo.id ? updated : t));
    } catch (err) {
      if (err.message === 'Unauthorized') {
        onLogout();
      } else {
        setError(err.message);
      }
    }
  };

  const handleStartEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleSaveEdit = async (id) => {
    if (!editText.trim()) return;

    setError('');
    try {
      const updated = await api.updateTodo(id, { text: editText });
      setTodos(todos.map(t => t.id === id ? updated : t));
      setEditingId(null);
      setEditText('');
    } catch (err) {
      if (err.message === 'Unauthorized') {
        onLogout();
      } else {
        setError(err.message);
      }
    }
  };

  const handleDelete = async (id) => {
    setError('');
    try {
      await api.deleteTodo(id);
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      if (err.message === 'Unauthorized') {
        onLogout();
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>My Todo List</h1>
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </div>

      <form onSubmit={handleAddTodo} className="add-todo-form">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Belajar ReactJS..."
          className="todo-input"
        />
        <button type="submit" className="add-btn">Add</button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <p className="loading">Loading todos...</p>
      ) : (
        <ul className="todo-list">
          {todos.length === 0 ? (
            <li className="empty-message">No todos yet. Add one above!</li>
          ) : (
            todos.map(todo => (
              <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo)}
                  className="todo-checkbox"
                />
                {editingId === todo.id ? (
                  <div className="edit-mode">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="edit-input"
                      autoFocus
                    />
                    <button onClick={() => handleSaveEdit(todo.id)} className="save-btn">Save</button>
                    <button onClick={handleCancelEdit} className="cancel-btn">Cancel</button>
                  </div>
                ) : (
                  <>
                    <span className="todo-text">{todo.text}</span>
                    <div className="todo-actions">
                      <button onClick={() => handleStartEdit(todo)} className="edit-btn">Edit</button>
                      <button onClick={() => handleDelete(todo.id)} className="delete-btn">Delete</button>
                    </div>
                  </>
                )}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
