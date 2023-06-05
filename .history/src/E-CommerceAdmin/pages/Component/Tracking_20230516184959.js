import React from "react";
import {  Button, Form, Modal, Table } from "react-bootstrap";
import HOC from "../../layout/HOC";

const Tracking = () => {
    const [modalShow, setModalShow] = React.useState(false);

    function MyVerticallyCenteredModal(props) {
      return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Create New
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" required />
           </Form.Group>
              <Button variant="outline-success" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      );
    }
  
  
  
    return (
      <>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
  
        <p className="headP">Dashboard / Tracking</p>
        <div
          className="pb-4 sticky top-0  w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase "
            style={{ fontSize: "1.5rem" }}
          >
            Tracking
          </span>
          <button
            onClick={() => {
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
          >
            + Create New
          </button>
        </div>
  
        <section className="sectionCont">
          <div className="filterBox">
            <img
              src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
              alt=""
            />
            <input type="search" placeholder="Start typing to search for User" />
          </div>
  
          <div className="overFlowCont">
            <Table>
              <thead>
                <tr>
                  <th>Number</th>
                  <th>User</th>
                  <th>Website</th>
                  <th>Option</th>
                </tr>
              </thead>
              <tbody>
               <tr>
                <td>#1</td>
                <td>User</td>
                <td>Website</td>
                <td>
                    <i className="fa-solid fa-trash" />
                </td>
               </tr>
              </tbody>
            </Table>
          </div>
        </section>
      </>
    );
  };
  
export default HOC(Tracking)