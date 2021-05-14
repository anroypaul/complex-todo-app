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
    <div className="todo item fluid">
      <div className="ui checked checkbox">
        <input type="checkbox" checked={completed} readOnly onClick={onClick} />
        <label>
          <div className="content aligned">
            <p className="header">{description}</p>
            <div className="description">
              {dueDate && prettyFormatDate(dueDate)}
            </div>
          </div>
        </label>
      </div>
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
