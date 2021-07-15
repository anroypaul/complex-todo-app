import React, {useState} from 'react';
import {
  TextArea,
  Select,
  Form,
  Button,
  Checkbox,
  Header,
  Icon,
  Modal,
} from 'semantic-ui-react';
// import {saveTodo} from '../../redux/actions/todoActions';
import PropTypes from 'prop-types';
// import {completeFormatDate} from '../../utils/dateFormatter';

const priorityOptions = [
  {key: '1', value: 1, text: 'Priority 1'},
  {key: '2', value: 2, text: 'Priority 2'},
  {key: '3', value: 3, text: 'Priority 3'},
  {key: '4', value: 4, text: 'Priority 4'},
];

const EditTodo = (props) => {
  const [open, setOpen] = React.useState(false);
  const [todo, setTodo] = useState(props.currentTodo);

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setTodo({...todo, [name]: value});
  };

  const handleSelectChange = (event, data) => {
    const {name, value} = data;
    setTodo({...todo, [name]: value});
  };

  const handleCheckboxChange = (event, data) => {
    setTodo({...todo, [data.name]: data.checked});
  };

  const onConfirm = () => {
    console.log(todo);
    props.updateTodo(todo);
    setOpen(false);
  };

  return (
    <Modal
      closeIcon
      open={open}
      trigger={props.trigger}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon="archive" content={props.title} />
      <Modal.Content>
        <Form>
          <Form.Field>
            <TextArea
              placeholder="Description"
              name="description"
              value={todo.description}
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Due date:</label>
            <input
              type="date"
              name="dueDate"
              value={todo.dueDate}
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Priority</label>
            <Select
              name="priority"
              placeholder="Select priority"
              options={priorityOptions}
              value={todo.priority}
              onChange={handleSelectChange}
            />
          </Form.Field>
          {/* <Form.Field>
            <label>Category</label>
            <Select placeholder="Select category" options={categories} />
          </Form.Field> */}
          <Form.Field>
            <Checkbox
              label="Completed"
              type="checkbox"
              name="completed"
              checked={todo.completed}
              onChange={handleCheckboxChange}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpen(false)}>
          <Icon name="remove" /> Cancel
        </Button>
        <Button color="green" onClick={() => onConfirm()}>
          <Icon name="checkmark" /> {props.confirmButtonText}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

EditTodo.propTypes = {
  currentTodo: PropTypes.object,
  updateTodo: PropTypes.func,
  title: PropTypes.string,
  confirmButtonText: PropTypes.string,
  trigger: PropTypes.node,
};

export default EditTodo;
