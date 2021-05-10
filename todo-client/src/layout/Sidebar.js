import React from 'react';

const Sidebar = () => {
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
        <a href="#" className="item">
          Nav item
        </a>
        <a href="#" className="item">
          Nav item again
        </a>
        <a href="#" className="item">
          One more nav
        </a>
        <a href="#" className="item">
          Another nav item
        </a>
        <a href="#" className="item">
          More navigation
        </a>
        <div className="ui divider"></div>
        <a href="#" className="item">
          Macintosh
        </a>
        <a href="#" className="item">
          Linux
        </a>
        <a href="#" className="item">
          Windows
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
