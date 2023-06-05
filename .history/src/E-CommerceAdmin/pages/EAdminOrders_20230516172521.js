/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Badge, Button, Form, Modal, Table } from "react-bootstrap";
import HOC from "../layout/HOC";

const EAdminOrders = () => {
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([]);

    // Pagination and Filter
    const [query, setQuery] = useState("");
    const [currentPage2, setCurrentPage2] = useState(1);
    const [postPerPage2] = useState(10);
    const lastPostIndex2 = currentPage2 * postPerPage2;
    const firstPostIndex2 = lastPostIndex2 - postPerPage2;
  
    let pages2 = [];
  
    const TotolData = query
      ? data?.filter(
          (i) =>
            i?.user?.toLowerCase().includes(query?.toLowerCase())  
        )
      : data;
  
    useEffect(() => {
      if (query) {
        setCurrentPage2(1);
      }
    }, [query]);
  
    const slicedData = TotolData?.slice(firstPostIndex2, lastPostIndex2);
  
    for (let i = 1; i <= Math.ceil(TotolData?.length / postPerPage2); i++) {
      pages2.push(i);
    }
  
    function Next() {
      setCurrentPage2(currentPage2 + 1);
    }
  
    function Prev() {
      if (currentPage2 !== 1) {
        setCurrentPage2(currentPage2 - 1);
      }
    }
  
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:8886/api/order"
      );
      setData(data.orders);
    } catch (e) {
      console.log("Order Err=>", e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function EditStatus(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Status
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Select aria-label="Default select example" className="mb-3">
              <option>--Edit Status--</option>
              <option value="1">Shipped</option>
              <option value="2">Pending</option>
              <option value="3">Canceled</option>
            </Form.Select>
            <Button variant="outline-success">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <EditStatus show={modalShow} onHide={() => setModalShow(false)} />
      <section>
        <p className="headP">Dashboard / Order</p>

        <div
          className="pb-4 sticky top-0  w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Order's 
          </span>
        </div>
        <section className="sectionCont">

          <div className="filterBox">
            <img
              src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
              alt=""
            />
            <input type="search" placeholder="Start typing to search"    />
          </div>
          <div className="overFlowCont">
            <Table>
              <thead>
                <tr>
                  <th>Number</th>
                  <th>User</th>
                  <th>Total Price</th>
                  <th>Payment Method</th>
                  <th>Status</th>
                  <th>Product Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#1</td>
                  <td>User</td>
                  <td>2,000</td>
                  <td>Cash</td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </div>
          

         
        </section>
      </section>
    </>
  );
};

export default HOC(EAdminOrders);
