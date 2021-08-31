import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {configureStore} from './redux/store';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import {authUser} from './redux/actions/authActions';
import * as apiUtils from './api/apiUtils';

const store = configureStore();

const token = apiUtils.getAccessToken();
const refreshToken = apiUtils.getRefreshToken();
if (token && refreshToken) {
  store.dispatch(authUser(token, refreshToken));
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <Route path="/" component={App} />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
