import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function TodoApp() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const API_URL = 'http://localhost:5000/api/todos';
  const token = localStorage.getItem('token');

  const axiosAuth = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: token
    }
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axiosAuth.get('/');
      setTasks(res.data);
    } catch (err) {
      alert('Failed to load tasks');
      console.error(err);
    }
  };

  const addOrUpdateTask = async () => {
    if (task.trim() === '') return;

    try {
      if (editIndex !== null) {
        await axiosAuth.patch(`/${tasks[editIndex]._id}`, { text: task });
        setEditIndex(null);
      } else {
        await axiosAuth.post('/', { text: task });
      }
      setTask('');
      fetchTasks();
    } catch (err) {
      alert('Action failed');
    }
  };

  const deleteLastTask = async () => {
    if (tasks.length === 0) return;
    const lastId = tasks[tasks.length - 1]._id;
    await axiosAuth.delete(`/${lastId}`);
    fetchTasks();
  };

  const deleteAll = async () => {
    for (const t of tasks) {
      await axiosAuth.delete(`/${t._id}`);
    }
    fetchTasks();
  };

  const toggleComplete = async (id) => {
    await axiosAuth.put(`/${id}`);
    fetchTasks();
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setTask(tasks[index].text);
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className="container">
      <h1>The To-Do List</h1>
      

      <label>Enter the Task:</label>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Type a task..."
      />

      <button onClick={addOrUpdateTask}>
        {editIndex !== null ? 'Update Task' : 'Add Task'}
      </button>
      <button onClick={deleteLastTask}>Delete Task</button>
      <button onClick={deleteAll}>Delete All Tasks</button>
      <button onClick={() => window.close()}>Exit</button>
      <button onClick={logout}>Logout</button>

      <ul>
        {tasks.map((t, i) => (
          <li key={t._id} style={{ cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleComplete(t._id)}
              style={{ marginRight: '10px' }}
            />
            <span
              onClick={() => toggleComplete(t._id)}
              style={{ textDecoration: t.completed ? 'line-through' : 'none' }}
            >
              {t.text}
            </span>
            <button onClick={() => handleEdit(i)} >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;