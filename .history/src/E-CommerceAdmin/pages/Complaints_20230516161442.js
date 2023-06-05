/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Modal, Table } from "react-bootstrap";
import HOC from "../layout/HOC";

const Complaints = () => {
  const [modalShow, setModalShow] = useState(false);



  function MyVerticallyCenteredModal(props) {
 
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {" "}
            Add Support
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                type="text"
                required
              />
            </Form.Group>
            <Button className="btn" type="submit">
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

      <p className="headP">Dashboard / Help and Support</p>
      <div
        className="pb-4 sticky top-0  w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase "
          style={{ fontSize: "1.5rem" }}
        >
          All Help and Support 
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
          <input
            type="search"
            placeholder="Start typing to search"
          />
        </div>

        <div className="overFlowCont">
          <Table>
            <thead>
              <tr>
                <th>SNo.</th>
                <th>Name</th>
                <th>Message</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td>1 </td>
                  <td> Lorem Ipsum  </td>
                  <td>Lorem Ipsume </td>
                  <td>
                    <i
                      className="fa-solid fa-trash"
                     />
                  </td>
                </tr>
         
            </tbody>
          </Table>
        </div>

      
      </section>
    </>
  );
};

export default HOC(Complaints);
