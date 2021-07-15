import React from 'react';
import PropTypes from 'prop-types';
import {getFormattedDate} from '../../utils/dateFormatter';

const TodoItem = ({
  children,
  description,
  dueDate,
  completed,
  priority,
  onClick,
}) => {
  return (
    <div className="todo">
      <div className="todo-header">
        <label>
          <input
            type="checkbox"
            checked={completed}
            readOnly
            onClick={onClick}
          />
        </label>
      </div>
      <div className="todo-body">
        <div className="content aligned">
          <p className={completed ? 'header checked-text' : 'header'}>
            {description}
            <i className={`flag icon priority-${priority}`}></i>
          </p>
          <div className="description">
            {dueDate && getFormattedDate(dueDate)}
          </div>
        </div>
      </div>
      <div className="todo-actions">
        Actions
        {children}
      </div>
    </div>
  );
};

TodoItem.propTypes = {
  children: PropTypes.array,
  description: PropTypes.string.isRequired,
  dueDate: PropTypes.string,
  completed: PropTypes.bool.isRequired,
  priority: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};

export default TodoItem;
