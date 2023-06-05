/** @format */
import React  from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import HOC from "../layout/HOC";

const Coupon = () => {
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
            {" "}
            Add Coupon Code
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Form.Group className="mb-3">
              <Form.Label>Coupon Length</Form.Label>
              <Form.Control
                type="number"
                min={0}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Discount Start</Form.Label>
              <Form.Control
                type="number"
                min={0}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Discount End</Form.Label>
              <Form.Control
                type="number"
                min={0}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Available Start</Form.Label>
              <Form.Control
                type="number"
                min={0}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Available End</Form.Label>
              <Form.Control
                type="number"
                min={0}
                required
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
          All Coupon (Total : )
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
