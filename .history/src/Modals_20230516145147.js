/** @format */

import { Form, Modal } from "react-bootstrap";

function UpdateProfile(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Profile Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
        <Form.Group className="mb-3">
            <Form.Label
        </Form.Group>
      </Form>
      </Modal.Body>
    </Modal>
  );
}
