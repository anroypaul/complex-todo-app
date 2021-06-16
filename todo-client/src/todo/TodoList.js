import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import {loadTodos, toggleTodoAction} from '../redux/actions/todoActions';

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const currentCategory = useSelector((state) =>
    state.categories.filter(
      (category) =>
        category.selected !== undefined && category.selected === true,
    ),
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTodos()).catch((error) => {
      alert(error);
    });
  }, [dispatch]);

  return (
    <div className="ui segment">
      <div className="sixteen wide column">
        <div className="ui celled container">
          <div className="todo-list-header">
            <h3 className="ui header ">
              {currentCategory[0]?.name || 'INBOX'}
            </h3>
          </div>
          <div className="ui section divider"></div>
          <div className="todo-list-body ui">
            <div className="ui relaxed divided items">
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  description={todo.description}
                  dueDate={todo.dueDate}
                  completed={todo.completed}
                  onClick={() => dispatch(toggleTodoAction(todo.id))}
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

export default TodoList;
