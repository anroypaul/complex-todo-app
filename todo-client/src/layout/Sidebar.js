import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {loadCategories} from '../redux/actions/categoriesActions';

const Sidebar = () => {
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCategories()).catch((error) => {
      alert(error);
    });
  }, [dispatch]);

  return (
    <div
      className="three wide tablet only three wide computer only column"
      id="sidebar"
    >
      <div className="ui vertical fluid text menu">
        <a href="#" className="active item">
          {' '}
          <i className="inbox icon"></i>Inbox
        </a>
        <a href="#" className="item">
          {' '}
          <i className="newspaper icon"></i> Today
        </a>
        <a href="#" className="item">
          {' '}
          <i className="calendar icon"></i>Upcoming
        </a>
        <div className="ui divider"></div>
        {categories.map((category) => (
          <a key={category.id} href="#" className="item">
            {category.name}
            <div className="ui label">{category.todoCount}</div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
