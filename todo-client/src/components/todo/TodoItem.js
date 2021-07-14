import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({description, dueDate, completed, onClick}) => {
  // move to utils
  const prettyFormatDate = (date) => {
    /**
     *
     * @param {Date} dateObject
     * @param {Array} dateFormat
     * @param {String} delimeter
     * @return {func}
     */
    function join(dateObject, dateFormat, delimeter) {
      /**
       *
       * @param {*} m
       * @return {*}
       */
      function format(m) {
        const dateTimeFormat = new Intl.DateTimeFormat('en', m);
        return dateTimeFormat.format(dateObject);
      }
      return dateFormat.map(format).join(delimeter);
    }

    const dateFormatArray = [
      {day: 'numeric'},
      {month: 'short'},
      {year: 'numeric'},
    ];
    const dateString = join(new Date(), dateFormatArray, '-');
    return dateString;
  };

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
          </p>
          <div className="description">
            {dueDate && prettyFormatDate(dueDate)}
          </div>
        </div>
      </div>
      <div className="todo-actions">Actions</div>
    </div>
  );
};

TodoItem.propTypes = {
  description: PropTypes.string.isRequired,
  dueDate: PropTypes.instanceOf(Date),
  completed: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TodoItem;
