import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import {loadTodos, toggleTodoAction} from '../redux/actions/todoActions';
import PropTypes from 'prop-types';

const TodoList = ({todos, loadTodos, toggleTodo, isAuthed}) => {
  console.log(isAuthed);
  useEffect(() => {
    loadTodos().catch((error) => {
      alert(error);
    });
  }, [isAuthed]);

  return (
    <div className="ui segment">
      <div className="sixteen wide column">
        <div className="ui celled container">
          <div className="todo-list-header">
            <h3 className="ui header ">My ToDos</h3>
          </div>
          <div className="ui section divider"></div>
          <div className="todo-list-body">
            <div className="ui fluid aligned selection list">
              {todos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  description={todo.description}
                  date={todo.date}
                  completed={todo.completed}
                  onClick={() => toggleTodo(todo._id)}
                />
              ))}
              <AddTodo />
            </div>
          </div>
          <div className="ui section divider"></div>
          <div className="todo-list-footer"></div>
          {/* <button onClick={() => console.log(todos)}>get state</button> */}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todos,
  isAuthed: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  toggleTodo: (id) => dispatch(toggleTodoAction(id)),
  loadTodos: () => dispatch(loadTodos()),
});

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  loadTodos: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  isAuthed: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
