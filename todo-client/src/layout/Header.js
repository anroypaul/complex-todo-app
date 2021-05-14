import React from 'react';
import {useDispatch} from 'react-redux';
import {logout} from '../redux/actions/authActions';

const Header = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="ui tablet computer only padded grid">
        <div className="ui inverted borderless top fixed fluid menu">
          <a className="header item">Awesome Tasklist App</a>
          <div className="right menu">
            <div className="item">
              <div className="ui small input">
                {/* <input placeholder="Search..." /> */}
              </div>
            </div>
            {/* <a className="item">Dashboard</a>
            <a className="item">Settings</a>
            <a className="item">Profile</a> */}
            <a className="item" onClick={() => dispatch(logout())}>
              Logout
            </a>
          </div>
        </div>
      </div>

      <div className="ui mobile only padded grid">
        <div className="ui top fixed borderless fluid inverted menu">
          <a className="header item">Awesome Tasklist App</a>
          <div className="right menu">
            <div className="item">
              <button className="ui icon toggle basic inverted button">
                <i className="content icon"></i>
              </button>
            </div>
          </div>
          <div className="ui vertical borderless inverted fluid menu">
            <a className="item" onClick={() => dispatch(logout())}>
              Logout
            </a>
            <div className="ui fitted divider"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
