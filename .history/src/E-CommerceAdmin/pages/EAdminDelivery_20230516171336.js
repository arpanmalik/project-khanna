import React from "react";
import { Table, Modal, Form, Button } from "react-bootstrap";
import HOC from "../layout/HOC";

const EAdminDelivery = () => {
  const [modalShow, setModalShow] = React.useState(false);

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size='lg'
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {" "}
            Add 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="tel"
                pattern="[0-9]{10}"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Whatsapp Number</Form.Label>
              <Form.Control
                type="tel"
                pattern="[0-9]{10}"
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

      <section>
        <p className="headP">Dashboard / Offer</p>

        <div
          className="pb-4   w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            Offer
          </span>

          <button
            onClick={() => {
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
          >
            Add Offer
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
                placeholder="Start typing to search for Customers"
              />
            </div>
          <div className="overFlowCont">
            <Table>
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#1</td>
                  <td> 
                  <img src='https://thumbs.dreamstime.com/b/special-offer-price-tag-55863934.jpg' alt='' style={{width : '100px'}}  />
                   </td>
                   <td>StockGro</td>
                   <td>Social Investment Platform</td>
                   <td>₹5</td>
                   <td>
                    <i className="fa-solid fa-trash" />
                   </td>
                </tr>
              </tbody>
            </Table>
          </div>

            
        </section>
      </section>
    </>
  );
};

export default HOC(EAdminDelivery);
