import React from 'react';
import {Button, Header, Icon, Modal} from 'semantic-ui-react';
import PropTypes from 'prop-types';

const ActionModal = ({
  children,
  title,
  onConfirmClick,
  confirmButtonText,
  trigger,
}) => {
  const [open, setOpen] = React.useState(false);

  const onConfirm = () => {
    onConfirmClick();
    setOpen(false);
  };

  return (
    <Modal
      closeIcon
      open={open}
      trigger={trigger}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon="archive" content={title} />
      <Modal.Content>{children}</Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpen(false)}>
          <Icon name="remove" /> Cancel
        </Button>
        <Button color="green" onClick={() => onConfirm()}>
          <Icon name="checkmark" /> {confirmButtonText}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

ActionModal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  onConfirmClick: PropTypes.func.isRequired,
  confirmButtonText: PropTypes.string,
  trigger: PropTypes.node,
};

export default ActionModal;
