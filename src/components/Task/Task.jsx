import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Task.css';

const Task = ({ task, onDelete, onEdit, onToggleComplete }) => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.body);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const timeDifference = Math.floor(
        (currentTime - task.createdAt) / 1000 / 60
      );
      setTimeElapsed(timeDifference);
    }, 60000);

    return () => clearInterval(interval);
  }, [task.createdAt]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editedText.trim()) {
      onEdit(task.createdAt, editedText);
      setIsEditing(false);
    }
  };

  return (
    <li
      className={`${task.isCompleted ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={task.isCompleted}
          onChange={onToggleComplete}
        />
        {isEditing ? (
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              className="edit"
              value={editedText}
              onChange={handleEditChange}
              autoFocus
            />
          </form>
        ) : (
          <label>
            <span className="description">{task.body}</span>
            <span className="created">created {timeElapsed} minutes ago</span>
          </label>
        )}
        <button className="icon icon-edit" onClick={handleEditClick}></button>
        <button className="icon icon-destroy" onClick={onDelete}></button>
      </div>
    </li>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
};

export default Task;
