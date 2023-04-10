import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoTest.css';

const TodoTest = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [completed, setCompleted] = useState(false);
  const [editTask, setEditTask] = useState('');
  const [editDueDate, setEditDueDate] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/todos/')
      .then(response => setTodos(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/todos/', { task: task, dueDate: dueDate, completed: completed })
      .then(response => {
        setTodos([...todos, response.data]);
        setTask('');
        setDueDate('');
        setCompleted(false);
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
        const updatedTodos = todos.map((todo) => {
          if (todo.id === response.data.id) {
            return response.data;
          } else {
            return todo;
          }
        });
        setTodos(updatedTodos);
        setEditTodoId(null);
      })
      .catch(error => console.log(error));
  };

  const handleTodoDelete = (todoId) => {
    axios.delete(`http://localhost:8080/todos/${todoId}`)
      .then(response => {
        const updatedTodos = todos.filter((todo) => todo.id !== todoId);
        setTodos(updatedTodos);
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h1>My To Do List</h1>
      <div class="form-container">
        <form onSubmit={handleSubmit} className="todo-form">
          <label>
            Task name:
            <input type="text" value={task} onChange={handleTaskChange} />
          </label>
          <br />
          <label>
            Due date:
            <input type="date" value={dueDate} onChange={handleDueDateChange} />
          </label>
          <br />
          <label>
            Completed:
            <input type="checkbox" checked={completed} onChange={handleCompletedChange} />
          </label>
          <br />
          <button type="submit">Add Task</button>
        </form>
      </div>
      <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id}>
          {editTodoId === todo.id ? (
            <div>
              <label>
                New task name:
                <input type="text" value={editTask} onChange={(event) => setEditTask(event.target.value)} />
              </label>
              <br />
              <label>
                New due date:
                <input type="date" value={editDueDate} onChange={(event) => setEditDueDate(event.target.value)} />
              </label>
              <br />
              <button onClick={() => handleTodoUpdate(todo.id, { ...todo, task: editTask, dueDate: editDueDate })}>Save changes</button>
              <button onClick={() => setEditTodoId(null)}>Cancel editing</button>
            </div>
          ) : (
            <div>
              <input type="checkbox" checked={todo.completed} onChange={(event) => handleTodoUpdate(todo.id, { task: todo.task, dueDate: todo.dueDate, completed: event.target.checked })} />
              <span>{todo.task} - {new Date(todo.dueDate).toLocaleDateString('en-GB')}</span>
              <button onClick={() => handleTodoDelete(todo.id)}>Delete</button>
              <button onClick={() => {
                setEditTask(todo.task);
                setEditDueDate(todo.dueDate);
                setEditTodoId(todo.id);
              }}>Edit</button>
            </div>
          )}
        </li>
        ))}
        </ul>
        </div>
        );
        }
export default TodoTest;
