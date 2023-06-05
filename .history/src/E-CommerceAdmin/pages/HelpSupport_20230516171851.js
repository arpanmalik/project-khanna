
import React, { useState } from "react";
import HOC from "../layout/HOC";
import { Table, Modal, Form, Button, FloatingLabel } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";


const HelpSupport = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [edit, setEdit] = useState(false);

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
            {edit ? "Edit Product" : " Add New Con"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {edit ? (
              ""
            ) : (
              <div className="d-flex gap-2" style={{ alignItems: "center" }}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Images</Form.Label>
                  <Form.Control type="file" required multiple />
                </Form.Group>

                <Button style={{ height: "40px", marginTop: "15px" }}>
                  Upload
                </Button>
              </div>
            )}

            <Form.Group className="mb-3">
              <Form.Label> Product Name</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <FloatingLabel controlId="floatingTextarea2" label="Description">
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" min={0} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label> Category</Form.Label>
              <Form.Select aria-label="Default select example" required>
                <option>-- Select Category --</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control type="number" min={0} required />
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

      <p className="headP">Dashboard / Contest</p>

      <div
        className="pb-4  w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase"
          style={{ fontSize: "1.5rem" }}
        >
          All Contest's
        </span>
        <div className="d-flex gap-1">
          <button
            onClick={() => {
              setEdit(false);
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
          >
            + Create New
          </button>
        </div>
      </div>

      <section className="sectionCont">
        <div className="filterBox">
          <img
            src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
            alt=""
          />
          <input
            type="search"
            placeholder="Start typing to search "
          />
        </div>

        <div className="overFlowCont">
          <Table>
            <thead>
              <tr>
                <th>Sno.</th>
                <th>Image</th>
                <th>Title</th>
                <th>Added By</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Total Stock</th>
                <th>Category</th>
                <th> Options </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#1</td>
                <td>
                  <img
                    src="https://m.media-amazon.com/images/I/71MAg1Iuy6L._UX466_.jpg"
                    alt=""
                    style={{ width: "100px" }}
                  />
                </td>
                <td> Peter England Men Shirt </td>
                <td> React </td>
                <td> ₹739 </td>
                <td> -47% </td>
                <td>100</td>
                <td> Men Clothing </td>
                <td>
                  <span className="flexCont">
                    <i className="fa-solid fa-eye" />
                    <i className="fa-solid fa-trash" />
                    <i className="fa-solid fa-pen-to-square" />
                  </span>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};
export default HOC(HelpSupport)