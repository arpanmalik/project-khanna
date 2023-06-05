/** @format */

import React, { useState, useEffect } from "react";
import { Table, Modal, Form, Button } from "react-bootstrap";
import HOC from "../layout/HOC";
import axios from "axios";
import { toast } from "react-toastify";

const EAdminDelivery = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const token = localStorage.getItem("token");
  const [offers, setOffers] = useState([]);

  const getOffers = async () => {
    const url =
      "https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/offer";
    try {
      const res = await axios.post(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOffers(res?.data?.data);
      console.log(res?.data?.data);
    } catch (err) {
      console.log(err?.message);
    }
  };
  useEffect(() => {
    getOffers();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [urlImg, setUrlImg] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");

    const postthumbImage = (e) => {
      const data = new FormData();
      data.append("file", e.target.files[0]);
      data.append("upload_preset", "ml_default");
      data.append("cloud_name", "dagqqok7o");
      fetch("https://api.cloudinary.com/v1_1/dagqqok7o/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setUrlImg(data.url);
          console.log(data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const urladd =
        "https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/create";
      try {
        console.log("wefdv", urlImg, title);
        const res = await axios.post(
          urladd,
          {
            title,
            description,
            amount,
            image: urlImg,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
       // console.log(res?.data);
        getOffers();
        toast.success("Offer added successfully");
      } catch (err) {
        toast.error(err.response.data.message);
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
          <Modal.Title id="contained-modal-title-vcenter"> Add</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => postthumbImage(e)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </Form.Group>

            <Button className="btn" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const [query, setQuery] = useState("");

  const searchOffer = !query
    ? offers
    : offers?.filter((item, i) => {
        return item?.title?.toLowerCase()?.includes(query?.toLowerCase());
      });

  const handleDelete = async(id)=>{
    const urld = `https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/offer/${id}`;
    try{
      const res = await axios.delete(urld,{
        headers : {Authorization: `Bearer ${token}`}
      })
      getOffers();
      toast.success("Offers deleted successfully");
    }catch(err){
      toast.error(err.response.data.message);
    }
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
              onChange={(e) => setQuery(e.target.value)}
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
                {searchOffer?.map((ele, i) => (
                  <>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <img
                          src={ele?.image}
                          alt=""
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{ele?.title}</td>
                      <td>{ele?.description}</td>
                      <td>{ele?.amount}</td>
                      <td>
                        <i className="fa-solid fa-trash" onClick={()=>handleDelete(ele?._id)}/>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
          </div>
        </section>
      </section>
    </>
  );
};

export default HOC(EAdminDelivery);
