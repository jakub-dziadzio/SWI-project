import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Todo.css';
import '@fortawesome/fontawesome-free/css/all.css';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [completed, setCompleted] = useState(false);
  const [editTask, setEditTask] = useState('');
  const [editDueDate, setEditDueDate] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [fieldsEmpty, setFieldsEmpty] = useState(false);
  const [timeLeft, setTimeLeft] = useState({});

  const [sortBy, setSortBy] = useState('newest');
  const [sortOrder, setSortOrder] = useState('desc');

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/todos/')
      .then(response => setTodos(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!task || !dueDate) {
      setFieldsEmpty(true);
      return;
    }
    axios.post('http://localhost:8080/todos/', { task, dueDate, completed })
      .then(response => {
        setTodos([...todos, response.data]);
        setTask('');
        setDueDate('');
        setCompleted(false);
        setFieldsEmpty(false);
        const newTodo = document.getElementById(response.data.id);
        if (newTodo) {
          newTodo.classList.add('new-task-animation', 'slide-animation');
        }
      })
      .catch(error => console.log(error));
  };

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleCompletedChange = (event) => {
    setCompleted(event.target.checked);
  };

  const handleTodoUpdate = (todoId, updatedTodo) => {
    axios.put(`http://localhost:8080/todos/${todoId}`, updatedTodo)
      .then(response => {
        const updatedTodos = todos.map(todo => (todo.id === response.data.id) ? response.data : todo);
        setTodos(updatedTodos);
        setEditTodoId(null);
      })
      .catch(error => console.log(error));
  };

  const handleTodoDelete = (todoId) => {
    axios.delete(`http://localhost:8080/todos/${todoId}`)
      .then(response => {
        const updatedTodos = todos.filter(todo => todo.id !== todoId);
        setTodos(updatedTodos);
      })
      .catch(error => console.log(error));
  };


  useEffect(() => {
    const calculateTimeLeft = () => {
      const newTimeLeft = {};
      todos.forEach((todo) => {
        const dueDate = new Date(todo.dueDate);
        const timeDiff = dueDate.getTime() - Date.now();
        const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
        newTimeLeft[todo.id] = daysLeft;
      });
      setTimeLeft(newTimeLeft);
    };
  
    calculateTimeLeft();
  }, [todos]);

  let sortedTodos = [...todos];
    if (searchTerm !== '') {
      sortedTodos = sortedTodos.filter(todo => todo.task.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (sortBy === 'newest') {
      sortedTodos.sort((a, b) => sortOrder === 'desc' ? b.id - a.id : a.id - b.id);
    } else if (sortBy === 'oldest') {
      sortedTodos.sort((a, b) => sortOrder === 'desc' ? a.id - b.id : b.id - a.id);
    } else if (sortBy === 'dueDate') {
      sortedTodos.sort((a, b) => sortOrder === 'desc' ? new Date(b.dueDate) - new Date(a.dueDate) : new Date(a.dueDate) - new Date(b.dueDate));
    }

  return (
    <div>
      <h1>My To-Do List</h1>
      {fieldsEmpty && <p className="error-message error-animation fade-out-animation">Please fill in all fields.</p>}
      <div className="form-container">
        <form onSubmit={handleSubmit} className="todo-form">
          <label>
            Task Name
            <input type="text" value={task} onChange={handleTaskChange} />
          </label>
          <br />
          <label>
            Due Date
            <input type="date" value={dueDate} onChange={handleDueDateChange} />
          </label>
          <br />
          <label>
            Completed
            <input type="checkbox" checked={completed} onChange={handleCompletedChange} />
          </label>
          <br />
          <button type="submit">Add To-do Task</button>
        </form>
      </div>
      <div className="filter-buttons">
      <label>
        Sort By:
        <select className='dropdown' value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="dueDate">Due Date</option>
        </select>
      </label>
      <label>
        Sort Order:
        <select className='dropdown' value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </label>
      </div>
      <div className="search-bar">
        <label>
        Search:
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </label>
      </div>
      <ul className="todo-list">
        {sortedTodos.map(todo => (
        <li
        key={todo.id}
        className={todo.completed ? "completed" : timeLeft[todo.id] <= 0 ? "overdue" : timeLeft[todo.id] <= 1 ? "due-soon" : "base"}>
          {editTodoId === todo.id ? (
            <div className="form-container">
              <label>
                New Task Name
                <input type="text" value={editTask} onChange={(event) => setEditTask(event.target.value)} />
              </label>
              <br />
              <label>
                New Due Date
                <input type="date" value={editDueDate} onChange={(event) => setEditDueDate(event.target.value)} />
              </label>
              <br />
              <button className="save" onClick={() => handleTodoUpdate(todo.id, { ...todo, task: editTask, dueDate: editDueDate })}><i class="fa-regular fa-floppy-disk"></i></button>
              <button className="cancel" onClick={() => setEditTodoId(null)}><i class="fa-solid fa-ban"></i></button>
            </div>
          ) : (
            <div>
              <input type="checkbox" checked={todo.completed} onChange={(event) => handleTodoUpdate(todo.id, { task: todo.task, dueDate: todo.dueDate, completed: event.target.checked })} />
                <strong>{todo.task}</strong>
                <br />
                <i class="fa-solid fa-calendar"></i>
                {new Date(todo.dueDate).toLocaleDateString('en-GB')}
              <button className="delete" onClick={() => handleTodoDelete(todo.id)}><i className="fas fa-trash-alt"></i></button>
              <button className="edit" onClick={() => {
                setEditTask(todo.task);
                setEditDueDate(todo.dueDate);
                setEditTodoId(todo.id);
              }}><i className="fas fa-edit"></i></button>
            </div>
          )}
        </li>
        ))}
        </ul>
        </div>
        );
        }
export default Todo;