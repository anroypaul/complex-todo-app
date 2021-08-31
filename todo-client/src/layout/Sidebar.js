import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NavLink} from 'react-router-dom';
import AddCategory from '../components/category/AddCategory';
import {
  loadCategories,
  // switchCurrentCategory,
} from '../redux/actions/categoriesActions';

const Sidebar = () => {
  const categories = useSelector((state) => state.categories);
  // const currentCategory = useSelector((state) =>
  //   state.categories.filter(
  //     (category) =>
  //       category.selected !== undefined && category.selected === true,
  //   ),
  // );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCategories()).catch((error) => {
      alert(error);
    });
  }, [dispatch]);

  // const onCategoryLinkClick = (category, e) => {
  //   dispatch(switchCurrentCategory(category));
  // };

  return (
    <div
      className="three wide tablet only three wide computer only column"
      id="sidebar"
    >
      <div className="ui vertical fluid text menu">
        <NavLink to="/inbox" className="item" activeClassName="active">
          <i className="inbox icon"></i>Inbox
        </NavLink>
        <NavLink to="/today" className="item" activeClassName="active">
          <i className="newspaper icon"></i>Today
        </NavLink>{' '}
        <NavLink to="/upcoming" className="item" activeClassName="active">
          <i className="calendar icon"></i>Upcoming
        </NavLink>
        <div className="ui divider"></div>
        {categories.map((category) => (
          <NavLink
            key={category.id}
            to={`/${category.id}`}
            className="item"
            activeClassName="active"
          >
            {category.name}
            <div className="ui label">{category.todoCount}</div>
          </NavLink>
        ))}
        <div className="ui divider"></div>
        <AddCategory />
      </div>
    </div>
  );
};

export default Sidebar;
