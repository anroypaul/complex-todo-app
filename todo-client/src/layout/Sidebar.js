import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AddCategory from '../category/AddCategory';
import {
  loadCategories,
  switchCurrentCategory,
} from '../redux/actions/categoriesActions';

const Sidebar = () => {
  const categories = useSelector((state) => state.categories);
  const currentCategory = useSelector((state) =>
    state.categories.filter(
      (category) =>
        category.selected !== undefined && category.selected === true,
    ),
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCategories()).catch((error) => {
      alert(error);
    });
  }, [dispatch]);

  const onCategoryLinkClick = (category, e) => {
    dispatch(switchCurrentCategory(category));
  };

  return (
    <div
      className="three wide tablet only three wide computer only column"
      id="sidebar"
    >
      <div className="ui vertical fluid text menu">
        <a
          href="#"
          key="INBOX"
          className={currentCategory?.id === 'INBOX' ? 'item active' : 'item'}
          onClick={(e) => onCategoryLinkClick({id: 'INBOX', name: 'Inbox'}, e)}
        >
          {' '}
          <i className="inbox icon"></i>Inbox
        </a>
        <a
          href="#"
          key="TODAY"
          className={currentCategory?.id === 'TODAY' ? 'item active' : 'item'}
          onClick={(e) => onCategoryLinkClick({id: 'TODAY', name: 'Today'}, e)}
        >
          {' '}
          <i className="newspaper icon"></i> Today
        </a>
        <a
          href="#"
          key="UPCOMING"
          className={
            currentCategory?.id === 'UPCOMING' ? 'item active' : 'item'
          }
          onClick={(e) =>
            onCategoryLinkClick({id: 'UPCOMING', name: 'Upcoming'}, e)
          }
        >
          {' '}
          <i className="calendar icon"></i>Upcoming
        </a>
        <div className="ui divider"></div>
        {categories.map((category) => (
          <a
            key={category.id}
            href="#"
            className={
              currentCategory?.id === category.id ? 'item active' : 'item'
            }
            onClick={(e) => onCategoryLinkClick(category, e)}
          >
            {category.name}
            <div className="ui label">{category.todoCount}</div>
          </a>
        ))}
        <div className="ui divider"></div>
        <AddCategory />
      </div>
    </div>
  );
};

export default Sidebar;
