import React from 'react';
import TodoList from '../components/todo/TodoList';

/**
 * @component
 * @return {component}
 */
const Dashboard = () => {
  return (
    <div
      className="sixteen wide mobile thirteen wide tablet
      thirteen wide computer right floated column"
      id="content"
    >
      <div className="ui centered grid">
        <div className="row">
          {/* <h1 className="ui huge dividing header">Dashboard</h1>
          <div className="center aligned row">
          </div> */}
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
