import React, { useState } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // all, completed, active

  // Добавление новой задачи
  const addTask = (taskName) => {
    if (taskName.trim() === '') return;
    const newTask = { id: Date.now(), name: taskName, completed: false };
    setTasks([...tasks, newTask]);
  };

  // Удаление задачи
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Отметка задачи как выполненной
  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Фильтрация задач
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  return (
    <div style={styles.container}>
      <h1>To-Do List</h1>
      <TaskInput onAddTask={addTask} />
      <FilterButtons currentFilter={filter} setFilter={setFilter} />
      <TaskList
        tasks={filteredTasks}
        onDeleteTask={deleteTask}
        onToggleTask={toggleTaskCompletion}
      />
    </div>
  );
};

const TaskInput = ({ onAddTask }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a new task"
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Add Task
      </button>
    </form>
  );
};

const TaskList = ({ tasks, onDeleteTask, onToggleTask }) => {
  return (
    <ul style={styles.list}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDeleteTask={onDeleteTask}
          onToggleTask={onToggleTask}
        />
      ))}
    </ul>
  );
};

const TaskItem = ({ task, onDeleteTask, onToggleTask }) => {
  return (
    <li style={styles.listItem}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleTask(task.id)}
        style={styles.checkbox}
      />
      <span
        style={{
          ...styles.taskName,
          textDecoration: task.completed ? 'line-through' : 'none',
        }}
      >
        {task.name}
      </span>
      <button onClick={() => onDeleteTask(task.id)} style={styles.deleteButton}>
        Delete
      </button>
    </li>
  );
};

const FilterButtons = ({ currentFilter, setFilter }) => {
  return (
    <div style={styles.filterButtons}>
      <button
        onClick={() => setFilter('all')}
        style={{
          ...styles.filterButton,
          backgroundColor: currentFilter === 'all' ? '#007BFF' : '#ddd',
        }}
      >
        All
      </button>
      <button
        onClick={() => setFilter('active')}
        style={{
          ...styles.filterButton,
          backgroundColor: currentFilter === 'active' ? '#007BFF' : '#ddd',
        }}
      >
        Active
      </button>
      <button
        onClick={() => setFilter('completed')}
        style={{
          ...styles.filterButton,
          backgroundColor: currentFilter === 'completed' ? '#007BFF' : '#ddd',
        }}
      >
        Completed
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  input: {
    width: '70%',
    padding: '10px',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    marginLeft: '10px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #ddd',
  },
  checkbox: {
    marginRight: '10px',
  },
  taskName: {
    flexGrow: 1,
    textAlign: 'left',
  },
  deleteButton: {
    padding: '5px 10px',
    fontSize: '14px',
    backgroundColor: '#FF4D4D',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  filterButtons: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  filterButton: {
    padding: '10px 20px',
    margin: '0 5px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default App;
