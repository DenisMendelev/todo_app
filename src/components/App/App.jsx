import { useState } from 'react';
import './App.css';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const addNewTask = (taskText) => {
    const newTask = {
      body: taskText,
      createdAt: Date.now(),
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const editTask = (createdAt, newText) => {
    const updatedTasks = tasks.map((task) =>
      task.createdAt === createdAt ? { ...task, body: newText } : task
    );
    setTasks(updatedTasks);
  };

  const toggleCompleteTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
  };

  const clearCompletedTasks = () => {
    const updatedTasks = tasks.filter((task) => !task.isCompleted);
    setTasks(updatedTasks);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.isCompleted;
    if (filter === 'completed') return task.isCompleted;
    return true;
  });
  console.log(filteredTasks);
  const activeTasksCount = tasks.filter((task) => !task.isCompleted).length;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAddTask={addNewTask} />
      </header>
      <section className="main">
        <TaskList
          tasks={filteredTasks}
          onDeleteTask={deleteTask}
          onEditTask={editTask}
          onToggleCompleteTask={toggleCompleteTask}
        />
        <Footer
          onFilterChange={handleFilterChange}
          activeTasksCount={activeTasksCount}
          onClearCompleted={clearCompletedTasks}
        />
      </section>
    </section>
  );
}

export default App;
