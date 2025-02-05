import {} from 'react';
import PropTypes from 'prop-types';
import './TaskList.css';
import Task from '../Task/Task';

function TaskList({ tasks, onDeleteTask, onEditTask, onToggleCompleteTask }) {
  return (
    <ul className="todo-list">
      {tasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          onDelete={() => onDeleteTask(index)}
          onEdit={onEditTask}
          onToggleComplete={() => onToggleCompleteTask(index)}
        />
      ))}
    </ul>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.number.isRequired,
      isCompleted: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  onToggleCompleteTask: PropTypes.func.isRequired,
};

export default TaskList;
