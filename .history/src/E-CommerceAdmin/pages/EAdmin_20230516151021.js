/** @format */

import axios from "axios";
import React, {  useState } from "react";
import { Alert, Badge, Button, Form, Modal, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import HOC from "../layout/HOC";

const EAdmin = () => {
  const [modalShow, setModalShow] = React.useState(false);

  function MyVerticallyCenteredModal(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [phone, setPhone] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const postHandler = async (e) => {
      e.preventDefault();
      if (password === passwordConfirmation) {
        try {
          const { data } = await axios.post(
            "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:8886/api/auth/register",
            {
              name,
              username: name,
              email,
              password,
              passwordConfirmation,
              phone,
              role: "admin",
            }
          );
          toast.success(`${data?.user?.name} Created `);
        } catch (e) {
          console.log(e);
          toast.error(e.response.data.message);
        }
      } else {
        setPasswordError(true);
      }
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Admin
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {passwordError ? (
            <Alert variant="danger">Passwords do not Match</Alert>
          ) : (
            ""
          )}
          <Form onSubmit={postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                pattern="[0-9]{10}"
                required
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                required
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                minLength={8}
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

  const data = [
    {
      name : "Addison Moor" , 
      email : "AddisonMoor@gmail.com" , 
      phone : "4521458745" , 
      role  : "Admin"
    },
    {
      name : "Keaton Austin" , 
      email : "KeatonAustin@gmail.com" , 
      phone : "7894561234" , 
      role  : "user"
    },
  ]

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <p className="headP">Dashboard / Admin</p>
      <div
        className="pb-4 sticky top-0  w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase "
          style={{ fontSize: "1.5rem" }}
        >
          All User ( Total : 1)
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
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Role</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
            {data.map((i , index) => (
              
            ))}
              <tr>
                <td>#1</td>
                <td>Keaton Austin</td>
                <td>elementum.at@aol.net</td>
                <td>9882205665</td>
                <td>
                  <Badge bg="success">Admin</Badge>
                </td>
                <td>
                  <i className="fa-sharp fa-solid fa-trash"></i>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default HOC(EAdmin);
