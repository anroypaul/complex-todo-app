import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router';
import {Pagination} from 'semantic-ui-react';
import {useDispatch, useSelector} from 'react-redux';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import {
  deleteTodo,
  loadTodos,
  toggleTodoAction,
  saveTodo,
} from '../../redux/actions/todoActions';
import EditTodo from './EditTodo';
import ActionModal from '../../layout/ActionModal';

const TodoList = () => {
  const {currentCategory} = useParams();
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    console.log(currentCategory);
    dispatch(loadTodos(currentCategory, page)).catch((error) => {
      alert(error);
    });
  }, [dispatch, currentCategory, page]);

  const handlePaginationChange = (e, {activePage}) => {
    setPage(activePage);
  };

  const updateTodo = (updatedTodo) => {
    dispatch(saveTodo(updatedTodo));
  };

  const titleBeatify = (text) => {
    return typeof text === 'string'
      ? text.charAt(0).toUpperCase() + text.slice(1)
      : text;
  };

  return (
    <div className="ui segment">
      <div className="sixteen wide column">
        <div className="ui celled container">
          <div className="todo-list-header">
            <h3 className="ui header ">{titleBeatify(currentCategory)}</h3>
          </div>
          <div className="ui section divider"></div>
          <div className="todo-list-body ui">
            <div className="ui relaxed divided items">
              {todos?.rows.map((todo) => (
                <TodoItem
                  key={todo.id}
                  description={todo.description}
                  dueDate={todo.dueDate}
                  completed={todo.completed}
                  priority={todo.priority}
                  onClick={() => dispatch(toggleTodoAction(todo.id))}
                >
                  <EditTodo
                    currentTodo={todo}
                    updateTodo={updateTodo}
                    title="Edit"
                    confirmButtonText="Save"
                    trigger={
                      <a>
                        <i className="edit alternate icon"></i>
                      </a>
                    }
                  />
                  <ActionModal
                    title="Delete"
                    onConfirmClick={() => dispatch(deleteTodo(todo.id))}
                    confirmButtonText="Delete"
                    trigger={
                      <a>
                        <i className="trash alternate icon"></i>
                      </a>
                    }
                  >
                    <p>
                      Are you sure you want to delete{' '}
                      <strong>{todo.description}</strong>?
                    </p>
                  </ActionModal>
                </TodoItem>
              ))}
              <AddTodo currentCategory={currentCategory} />
            </div>
          </div>
          <div className="ui section divider"></div>
          <div className="todo-list-footer">
            {todos.length > 0 ? (
              <Pagination
                activePage={page}
                boundaryRange={0}
                onPageChange={handlePaginationChange}
                size="mini"
                siblingRange={1}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                totalPages={todos.totalPages || 0}
              />
            ) : (
              ''
            )}
          </div>
          {/* <button onClick={() => console.log(todos)}>get state</button> */}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
