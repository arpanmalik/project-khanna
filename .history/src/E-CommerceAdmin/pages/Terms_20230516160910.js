/** @format */

import React from "react";
import HOC from "../layout/HOC";
import { Table, Modal, Form, Button, FloatingLabel } from "react-bootstrap";

const Terms = () => {
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
            Add Terms & Condition
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingTextarea2"
                label="Terms and Condition"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                />
              </FloatingLabel>
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

      <section>
        <p className="headP">Dashboard / Terms&Condition</p>
        <div
          className="pb-4 sticky top-0  w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Terms&Condition 
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
                placeholder="Start typing to search "
              />
            </div>
          <div className="overFlowCont">
            <Table>
              <thead>
                <tr>
                  <th>Terms and Condition</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <td>Terms and Condition</td>
                    <td>
                      <i
                        className="fa-sharp fa-solid fa-trash"
                       ></i>
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

export default HOC(Terms);
