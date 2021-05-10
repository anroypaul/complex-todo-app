import React, {useState} from 'react';
import {connect} from 'react-redux';
import {saveTodo} from '../redux/actions/todoActions';
import PropTypes from 'prop-types';

const AddTodo = ({saveTodo}) => {
  const [description, setDescription] = useState('');
  const [formActivated, setFormActivated] = useState(false);

  const onFormSubmit = (e) => {
    e.preventDefault();
    saveTodo({description, date: Date.now()});
    setDescription('');
    setFormActivated(false);
  };

  const onClick = (e) => {
    e.preventDefault();
    console.log(formActivated);
    formActivated ? setFormActivated(false) : setFormActivated(true);
  };

  return (
    <>
      {formActivated ? (
        <form className="add-todo" onSubmit={onFormSubmit}>
          <div className="ui  input">
            <input
              placeholder="New To-Do..."
              name="new-todo"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button className="ui red button" type="submit">
              Add
            </button>
            <button className="ui blue button" onClick={onClick}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="item fluid" onClick={onClick}>
          <div className="ui checked checkbox">+</div>
          <div className="content aligned">Add task</div>
        </div>
      )}
    </>
  );
};

AddTodo.propTypes = {
  saveTodo: PropTypes.func.isRequired,
};

export default connect(null, {saveTodo})(AddTodo);
