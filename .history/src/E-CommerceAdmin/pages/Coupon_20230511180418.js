/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import HOC from "../layout/HOC";

const Coupon = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);

  const token = localStorage.getItem("AdminToken");

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:8886/api/discount",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(data.codes);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [codeLength, setCodeLength] = useState("");
    const [discountStart, setDiscountStart] = useState("");
    const [discountEnd, setDiscountEnd] = useState("");
    const [availableStart, setAvailableStart] = useState("");
    const [availableEnd, setAvailableEnd] = useState("");


    const postHandler = async (e) => {
      e.preventDefault()
      try {
        const { data } = await axios.post(
          "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:8886/api/discount/generate",
          {
            codeLength,
            discountStart,
            discountEnd,
            availableStart,
            availableEnd,
          },  {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        fetchData();
        toast.success("Added");
        fetchData();
      } catch (e) {
        console.log(e);
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
            {" "}
            Add Coupon Code
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Coupon Length</Form.Label>
              <Form.Control
                type="number"
                min={0}
                required
                onChange={(e) => setCodeLength(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Discount Start</Form.Label>
              <Form.Control
                type="number"
                min={0}
                required
                onChange={(e) => setDiscountStart(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Discount End</Form.Label>
              <Form.Control
                type="number"
                min={0}
                required
                onChange={(e) => setDiscountEnd(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Available Start</Form.Label>
              <Form.Control
                type="number"
                min={0}
                required
                onChange={(e) => setAvailableStart(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Available End</Form.Label>
              <Form.Control
                type="number"
                min={0}
                required
                onChange={(e) => setAvailableEnd(e.target.value)}
              />
            </Form.Group>

            <Button
              style={{ backgroundColor: "#19376d", borderRadius: "0" }}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:8886/api/discount/${id}` ,   {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(data)
      fetchData()
      toast.success(` Deleted Successfully`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <p className="headP">Dashboard / Coupon</p>

      <div
        className="pb-4 sticky top-0  w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase "
          style={{ fontSize: "1.5rem" }}
        >
          All Coupon (Total : {data?.length} )
        </span>
        <button
          onClick={() => {
            setModalShow(true);
          }}
          className="md:py-2 px-3 md:px-4 py-1 rounded-sm  bg-[#19376d] text-white tracking-wider"
        >
          Add Coupon
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
            placeholder="Start typing to Search"
            // onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="overFlowCont">
          <Table>
            <thead>
              <tr>
                <th>SNo.</th>
                <th>Coupon Code</th>
                <th>Discount</th>
                <th>Available</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((i, index) => (
                <tr key={index}>
                  <td> #{index + 1} </td>
                  <td> {i.code} </td>
                  <td> {i.discount}% </td>
                  <td> {i.available} Days </td>
                  <td>
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => deleteHandler(i._id)}
                    />
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

export default HOC(Coupon);
