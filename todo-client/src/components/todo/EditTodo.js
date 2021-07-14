import React from 'react';
import {useSelector} from 'react-redux';
import {TextArea, Select, Checkbox, Form} from 'semantic-ui-react';
import PropTypes from 'prop-types';

const EditTodo = ({description, priority, dueDate, completed}) => {
  const categories = useSelector((state) => state.categories);

  console.log(categories);

  return (
    <Form>
      <Form.Field>
        <TextArea placeholder="Description" value={description} />
      </Form.Field>
      <Form.Field>
        <label>Due date:</label>
        <input type="date" value={dueDate} />
      </Form.Field>
      <Form.Field>
        <label>Priority</label>
        <input placeholder="Priority from 1 to 4" value={priority} />
      </Form.Field>
      <Form.Field>
        <label>Category</label>
        <Select placeholder="Select category" options={categories} />
      </Form.Field>
      <Form.Field>
        <Checkbox label="Completed" checked={completed} />
      </Form.Field>
    </Form>
  );
};

EditTodo.propTypes = {
  description: PropTypes.string.isRequired,
  dueDate: PropTypes.instanceOf(Date),
  completed: PropTypes.bool.isRequired,
  priority: PropTypes.number,
};

export default EditTodo;
