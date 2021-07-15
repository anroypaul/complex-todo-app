export const prettyFormatDate = (date) => {
  /**
   *
   * @param {Date} dateObject
   * @param {Array} dateFormatOptions
   * @param {String} delimeter
   * @return {func}
   */
  function join(dateObject, dateFormatOptions, delimeter) {
    /**
     *
     * @param {*} m
     * @return {*}
     */
    function format(m) {
      const dateTimeFormat = new Intl.DateTimeFormat('en-US', m);
      return dateTimeFormat.format(dateObject);
    }
    return dateFormatOptions.map(format).join(delimeter);
  }

  const dateFormatArray = [
    {day: 'numeric'},
    {month: 'short'},
    {year: 'numeric'},
  ];

  if (date === null) date = Date.now();

  const dateString = join(new Date(date), dateFormatArray, '-');
  return dateString;
};

export const completeFormatDate = (date) => {
  if (date == null) date = Date.now();
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

export const getFormattedDate = (date) => {
  console.log(date);
  const [year, month, day] = date.split('-');
  return month + '/' + day + '/' + year;
};
