/** @format */
import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import HOC from "../layout/HOC";
import axios from "axios";

const Coupon = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  const token = localStorage.getItem("token");
  const [coupons, setCoupons] = useState([]);
  const getCoupons = async () => {
    const url =
      "https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/coupon";
    try {
      const res = await axios.post(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCoupons(res?.data?.data);
    } catch (err) {
      console.log(err?.message);
    }
  };

  useEffect(() => {
    getCoupons();
  }, []);

  const [query, setQuery] = useState("");
  const searchData = !query
    ? coupons
    : coupons?.filter((item, i) => {
        return item?.couponCode?.includes(query);
      });

  const handleDelete = async (id) => {
    //console.log(id);
    const urld = `https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/coupon/${id}`;
    try {
      const res = await axios.delete(urld, {
        headers: { Authorization: `Bearer ${token}` },
      });
      //console.log("clicked", res?.data);
      toast.success("Coupon deleted successfully");
      getCoupons();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [couponCode, setCode] = useState("");
    const [discount, setDiscount] = useState("");
    const [activationDate, setADate] = useState("");
    const [expiryDate, setEDate] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      const urla =
        "https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/createCoupon";
      try {
        const res = await axios.post(
          urla,
          {
            couponCode,
            discount,
            activationDate,
            expiryDate,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        //console.log(res?.data);
        toast.success("Coupon added successfully");
        getCoupons();
      } catch (err) {
        console.log(err.message);
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
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Coupon Code</Form.Label>
              <Form.Control
                type="text"
                
                onChange={(e) => setCode(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Discount </Form.Label>
              <Form.Control
                type="number"
                min={0}
                onChange={(e) => setDiscount(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Activation Date</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setADate(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setEDate(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              style={{ backgroundColor: "#19376d", borderRadius: "0" }}
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const [upId, setUpId] = useState("");

  const handleUpdate = async(id)=>{
    setUpId(id);
    setModalShow2(true);
  }

  function MyVerticallyCenteredModal2(props) {
    const [couponCode2, setCode2] = useState();
    const [discount2, setDiscount2] = useState();
    const [activationDate2, setADate2] = useState();
    const [expiryDate2, setEDate2] = useState();

    //const couponCode3 = couponCode2==="" ? couponCode : couponCode2;

    const handleSubmit = async (e) => {
      e.preventDefault();
      const urlup =
        `https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/coupon/${upId}`;
      try {
        const res = await axios.patch(
          urlup,
          {
            couponCode:couponCode2,
            discount:discount2,
            activationDate:activationDate2,
            expiryDate:expiryDate2,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(res?.data);
        toast.success("Coupon Updated successfully");
        getCoupons();
      } catch (err) {
        console.log(err.message);
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
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Coupon Code</Form.Label>
              <Form.Control
                type="text"
                
                onChange={(e) => setCode2(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Discount </Form.Label>
              <Form.Control
                type="number"
                min={0}
                onChange={(e) => setDiscount2(e.target.value)}
                
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Activation Date</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setADate2(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setEDate2(e.target.value)}
                
              />
            </Form.Group>

            <Button
              style={{ backgroundColor: "#19376d", borderRadius: "0" }}
              type="submit"
              onClick={handleSubmit}
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

      <MyVerticallyCenteredModal2
        show={modalShow2}
        onHide={() => setModalShow2(false)}
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
          All Coupon (Total : {coupons.length} )
        </span>
        <button
          onClick={() => {
            setModalShow(true);
          }}
          className="md:py-2 px-3 md:px-4 py-1 rounded-sm  bg-[#19376d] text-white tracking-wider"
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
            placeholder="Start typing to Search"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="overFlowCont">
          <Table>
            <thead>
              <tr>
                <th>Number</th>
                <th>Coupon Code</th>
                <th>Discount</th>
                <th>Activation Date</th>
                <th>Expiry Date</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {searchData?.map((i, index) => (
                <tr key={index}>
                  <td> #{index + 1} </td>
                  <td> {i.couponCode} </td>
                  <td> {i.discount} </td>
                  <td> {i.activationDate} </td>
                  <td> {i.expiryDate} </td>
                  <td>
                    <span className="flexCont">
                      <i
                        className="fa-solid fa-pen-to-square"
                        onClick={() => {
                          handleUpdate(i?._id);
                        }}
                      ></i>
                      <i
                        className="fa-sharp fa-solid fa-trash"
                        onClick={() => handleDelete(i?._id)}
                      ></i>
                    </span>
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
