
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalExample = (props) => {
  const {
    isOpen,
    setShowModal,
    text
  } = props;

//   const [modal, setModal] = useState(false);

  const toggle = () => setShowModal(!isOpen);

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle} className="{className}">
        {/* <ModalHeader toggle={toggle}>Modal title</ModalHeader> */}
        <ModalBody>
            <div className="ModalContent">
            {text}
          <Button color="primary" className="ModalButton" onClick={toggle}>OK</Button>
            </div>
        </ModalBody>
        {/* <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
        </ModalFooter> */}
      </Modal>
    </div>
  );
}

export default ModalExample;