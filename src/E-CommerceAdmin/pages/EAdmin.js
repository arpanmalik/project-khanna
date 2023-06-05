/** @format */

import React, { useEffect, useState } from "react";
import { Badge, Button, Form, Modal, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import HOC from "../layout/HOC";
import axios from "axios";

const EAdmin = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const url =
      "https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/users/";
    try {
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res?.data?.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirm] = useState("");

    const urladd =
      "https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/auth/createUser";

    const handleAdd = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(
          urladd,
          {
            name,
            email,
            phone,
            role,
            password,
            confirmPassword,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(res?.data);
        alert(res?.data?.message);
        getUsers();
      } catch (err) {
        alert(err?.response?.data?.message);
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
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                pattern="[0-9]{10}"
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setConfirm(e.target.value)}
                required
                minLength={8}
              />
            </Form.Group>
            <Form.Select
              aria-label="Default select example"
              className="mb-3"
              onChange={(e) => setRole(e.target.value)}
            >
              <option>-- Select Role --</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Form.Select>
            <Button variant="outline-success" type="submit" onClick={handleAdd}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const data = [
    {
      name: "Addison Moor",
      email: "AddisonMoor@gmail.com",
      phone: "4521458745",
      role: "Admin",
    },
    {
      name: "Keaton Austin",
      email: "KeatonAustin@gmail.com",
      phone: "7894561234",
      role: "user",
    },
  ];

  const [query, setQuery] = useState("");

  const searchData = !query
    ? users
    : users?.filter((ele, i) => {
        return (
          ele?.name?.toLowerCase()?.includes(query.toLowerCase()) ||
          ele?.email?.includes(query) ||
          ele?.phone?.includes(query)
        );
      });

  const handleDelete = async (id) => {
    const urldel = `https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/users/${id}`;
    try{
      const res = await axios.delete(urldel,
      {
        headers:{Authorization:`Bearer ${token}`}
      }
      )
      toast.success("User Deleted Successfully");
      getUsers();
    }catch(err){
      toast.error(err?.response?.data?.message);
    }
  };

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
          <input
            type="search"
            placeholder="Start typing to search for User"
            onChange={(e) => setQuery(e.target.value)}
          />
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
              {searchData.map((i, index) => (
                <tr key={index}>
                  <td>#{index + 1} </td>
                  <td> {i.name} </td>
                  <td> {i.email} </td>
                  <td>{i.phone}</td>
                  <td>
                    {i.role === "Admin" ? (
                      <Badge bg="success">Admin</Badge>
                    ) : (
                      <Badge bg="info">User</Badge>
                    )}
                    {i.role === "user" ? <Badge bg="info">User</Badge> : ""}
                  </td>
                  <td>
                    <i
                      className="fa-sharp fa-solid fa-trash"
                      onClick={() => handleDelete(i?._id)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default HOC(EAdmin);
