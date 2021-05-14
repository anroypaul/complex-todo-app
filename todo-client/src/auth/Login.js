import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {signIn, signUp} from '../redux/actions/authActions';

/**
 * @component
 * @return {Component}
 */
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(signIn(username, password));
    setLoading(false);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(signUp(username, password));
    setLoading(false);
  };

  return (
    <div className="login">
      {loading ? (
        <div className="ui active dimmer">
          <div className="ui loader"></div>
        </div>
      ) : (
        ''
      )}
      <div className="ui middle aligned center aligned grid">
        <div className="column">
          <h2 className="ui teal image header">
            <div className="content">Login Page</div>
          </h2>
          <form onSubmit={handleSubmit} className="ui large form">
            <div className="ui stacked segment">
              <div className="field">
                {/* <label>Username</label> */}
                <div className="ui left icon input">
                  <i className="user icon"></i>
                  <input
                    placeholder="Username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon"></i>
                  <input
                    placeholder="Password"
                    name="username"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div
                className="ui fluid large teal submit button"
                onClick={handleSubmit}
              >
                {/* <input type="submit" value="Login" /> */}Login
              </div>
            </div>
          </form>

          <div className="ui message">
            New to us? <button onClick={handleSignUp}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
