import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {saveCategory} from '../../redux/actions/categoriesActions';

const AddCategory = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [formActivated, setFormActivated] = useState(false);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const newCategory = {name};

    dispatch(saveCategory(newCategory));
    setName('');
    setFormActivated(false);
  };

  const onClick = (e) => {
    e.preventDefault();
    formActivated ? setFormActivated(false) : setFormActivated(true);
  };

  return (
    <>
      {formActivated ? (
        <form className="add-todo" onSubmit={onFormSubmit}>
          <a className="item">
            <div className="ui input action">
              <input
                placeholder="New Category..."
                name="new-todo"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button className="ui red button" type="submit">
                Add
              </button>
              <button className="ui blue button" onClick={onClick}>
                Cancel
              </button>
            </div>
          </a>
        </form>
      ) : (
        <a className="item" onClick={onClick}>
          <i className="plus icon"></i>Add Category
        </a>
      )}
    </>
  );
};

export default AddCategory;
