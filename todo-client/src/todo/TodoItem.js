import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({description, date, completed, onClick}) => {
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
    <div className="item fluid" onClick={onClick}>
      <div className="ui checked checkbox">
        <input type="checkbox" checked={completed} readOnly />
        <label>
          <div className="content aligned">
            <p className="header">{description}</p>
            <div className="description">{prettyFormatDate(date)}</div>
          </div>
        </label>
      </div>
    </div>
  );
};

TodoItem.propTypes = {
  description: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  completed: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TodoItem;
