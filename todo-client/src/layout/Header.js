import React from 'react';

const Header = () => {
  return (
    <>
      <div className="ui tablet computer only padded grid">
        <div className="ui inverted borderless top fixed fluid menu">
          <a className="header item">Project name</a>
          <div className="right menu">
            <div className="item">
              <div className="ui small input">
                <input placeholder="Search..." />
              </div>
            </div>
            <a className="item">Dashboard</a> <a className="item">Settings</a>
            <a className="item">Profile</a> <a className="item">Help</a>
          </div>
        </div>
      </div>

      <div className="ui mobile only padded grid">
        <div className="ui top fixed borderless fluid inverted menu">
          <a className="header item">Project Name</a>
          <div className="right menu">
            <div className="item">
              <button className="ui icon toggle basic inverted button">
                <i className="content icon"></i>
              </button>
            </div>
          </div>
          <div className="ui vertical borderless inverted fluid menu">
            <a className="item">Dashboard</a> <a className="item">Settings</a>
            <a className="item">Profile</a> <a className="item">Help</a>
            <div className="ui fitted divider"></div>
            <div className="item">
              <div className="ui small input">
                <input placeholder="Search..." />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
