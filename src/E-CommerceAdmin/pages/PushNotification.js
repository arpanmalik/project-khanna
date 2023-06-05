/** @format */

import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FloatingLabel,
  Form,
  Modal,
  Table,
} from "react-bootstrap";
import HOC from "../layout/HOC";
import axios from "axios";
import { toast } from "react-toastify";

const PushNotification = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [query, setQuery] = useState("");
  const [currentPage2, setCurrentPage2] = useState(1);
  const [postPerPage2] = useState(10);
  const lastPostIndex2 = currentPage2 * postPerPage2;
  const firstPostIndex2 = lastPostIndex2 - postPerPage2;
  let pages2 = [];

  const [data, setData] = useState([]);

  const token = localStorage.getItem("token");

  const getNotification = async () => {
    const url =
      "https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/notifications";
    try {
      console.log(token);
      const res = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(res?.data);
      console.log(res?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const TotolData = query
    ? data?.filter((i) =>
        i?.message?.toLowerCase().includes(query?.toLowerCase())
      )
    : data;

  useEffect(() => {
    getNotification();
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

  function MyVerticallyCenteredModal(props) {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const handleSubmit = async(e)=>{
      e.preventDefault();
      const urla = "https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/createNotifications";
      try{
        const res = await axios.post(urla, {title, message},{
          headers : {Authorization :`Bearer ${token}`}
        })
        console.log(res?.data);
        getNotification();
        toast.success("Notification pushed successfully");

      }catch(err){
        toast.error(err.response.data.message);
      }
    }
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
            Add Notification
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                onChange={(e)=>setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Notification</Form.Label>
              <FloatingLabel controlId="floatingTextarea2">
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  onChange={(e)=>setMessage(e.target.value)}
                />
              </FloatingLabel>
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

  const [showt, setShowt] = useState(false);
  const [id, setId] = useState("");
  const handleView = (id)=>{
    setId(id);
    setShowt(true);
  }

  function MyVerticallyCenteredModal2(props) {
    const [message, setMessage] = useState("");
    const getNotId = async()=>{
      const urli = `https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/notifications/${id}`;
      try{
        const res = await axios.get(urli,{
          headers:{Authorization :`Bearer ${token}`}
        })
        //console.log(res?.data);
        setMessage(res?.data?.message);
      }catch(err){
       
      }
    }
    useEffect(()=>{
      getNotId();
    })
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
            Add Notification
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>
      </Modal>
    );
  }

  const handleDelete = async(id)=>{
    const urld = `https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/notifications/${id}`;
    try{
      const res = await axios.delete(urld,{
        headers: {Authorization : `Bearer ${token}`}
      })
      getNotification();
      toast.success("Notification deleted successfully");
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
      <MyVerticallyCenteredModal2
        show={showt}
        onHide={() => setShowt(false)}
      />

      <p className="headP">Dashboard / Push Notification</p>

      <div
        className="pb-4   w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase "
          style={{ fontSize: "1.5rem" }}
        >
          All Notification (Total : {data.length})
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
        {data?.length === 0 || !data ? (
          <Alert>No Data Found</Alert>
        ) : (
          <>
            {/* Filter */}
            <div className="filterBox">
              <img
                src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
                alt=""
              />
              <input
                type="search"
                placeholder="Start typing to search "
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="overFlowCont">
              <Table>
                <thead>
                  <tr>
                    <th>SNo.</th>
                    <th>Message</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {slicedData.map((i, index) => (
                    <tr key={index}>
                      <td> #{index + 1} </td>
                      <td> {i.message?.substring(0, 50) + " ..."} </td>
                      <td>
                        <span className="flexCont">
                          <i className="fa-solid fa-eye" onClick={()=>handleView(i?._id)}></i>
                          <i className="fa-sharp fa-solid fa-trash"
                            onClick={()=>handleDelete(i?._id)}
                          ></i>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            {/* Pagination */}
            <div className="pagination">
              <button onClick={() => Prev()} className="prevBtn">
                <i className="fa-solid fa-backward"></i>
              </button>
              {currentPage2 === 1 ? (
                ""
              ) : (
                <button onClick={() => setCurrentPage2(1)}>1</button>
              )}

              {pages2
                ?.slice(currentPage2 - 1, currentPage2 + 3)
                .map((i, index) =>
                  i === pages2?.length ? (
                    ""
                  ) : (
                    <button
                      key={index}
                      onClick={() => setCurrentPage2(i)}
                      className={currentPage2 === i ? "activePage" : ""}
                    >
                      {" "}
                      {i}{" "}
                    </button>
                  )
                )}

              <button
                onClick={() => setCurrentPage2(pages2?.length)}
                className={currentPage2 === pages2?.length ? "activePage" : ""}
              >
                {" "}
                {pages2?.length}{" "}
              </button>

              {currentPage2 === pages2?.length ? (
                ""
              ) : (
                <button onClick={() => Next()} className="nextBtn">
                  {" "}
                  <i className="fa-sharp fa-solid fa-forward"></i>
                </button>
              )}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default HOC(PushNotification);
