import PropTypes from 'prop-types';
import './Footer.css';
import TaskFilter from '../TaskFilter/TaskFilter';

function Footer({ onFilterChange, activeTasksCount, onClearCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">
        {activeTasksCount} {activeTasksCount === 1 ? 'item' : 'items'} left
      </span>
      <TaskFilter onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  activeTasksCount: PropTypes.number.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
};

export default Footer;
