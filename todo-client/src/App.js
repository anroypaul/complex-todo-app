import React from 'react';
import {useSelector} from 'react-redux';
import './App.css';
import Login from './auth/Login';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';
import Dashboard from './layout/Dashboard';

/**
 * Entry Point
 * @return {Component}
 */
function App() {
  const auth = useSelector((state) => state.auth);

  return (
    <div className="App">
      {auth.isAuthenticated ? (
        <>
          <Header />
          <div className="ui padded grid">
            <Sidebar />
            <Dashboard />
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
