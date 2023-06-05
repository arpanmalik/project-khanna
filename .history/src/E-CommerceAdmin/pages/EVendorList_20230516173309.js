/** @format */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Badge, Button, Form, Modal, Table } from "react-bootstrap";

import HOC from "../layout/HOC";

const EVendorList = () => {
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
            Add Seller
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Form.Group className="mb-3">
              <Form.Label>Horoscope</Form.Label>
              <Form.Control
                type="text"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Professional</Form.Label>
              <Form.Control
                type="text"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Emotions</Form.Label>
              <Form.Control
                type="text"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Health</Form.Label>
              <Form.Control
                type="text"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Travel  </Form.Label>
              <Form.Control
                type="text"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Luck</Form.Label>
              <Form.Control
                type="text"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rashi</Form.Label>
              <Form.Control
                type="text"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="text"
                required
              />
            </Form.Group>
      
            <Button variant="outline-success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }


  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <p className="headP">Dashboard / Horoscope</p>
      <div
        className="pb-4 sticky top-0  w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase "
          style={{ fontSize: "1.5rem" }}
        >
          All Horoscope
        </span>
        <button
          onClick={() => {
            setModalShow(true);
          }}
          className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
        >
          Create New
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
                    <th>Horoscope</th>
                    <th> Professional  </th>
                    <th>Emotions</th>
                    <th>Health  </th>
                    <th>Travel</th>
                    <th>Luck	</th>
                    <th>Duration</th>
                    <th>Rashi</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
             <tr>
              <td>#1</td>
              <td> Horoscope </td>
              <td> Professional </td>
              <td>Emotions  </td>
              <td> Health </td>
              <td> Travel </td>
              <td> Luck </td>
              <td> Duration </td>
              <td>Rashi  </td>
              <td>Date  </td>
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

export default HOC(EVendorList);
