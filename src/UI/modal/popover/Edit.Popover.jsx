import React from 'react';
import Popover from 'react-bootstrap/Popover';

const EditPopover = (props) => {
    return (
  <Popover id="popover-basic">
	<Popover.Header as="h3">Popover right</Popover.Header>
    <Popover.Body>
      <input />
    </Popover.Body>
  </Popover>
    );
};

export default EditPopover;