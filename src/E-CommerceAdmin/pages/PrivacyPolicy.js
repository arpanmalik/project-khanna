/** @format */

import React, {useEffect, useState} from "react";
import HOC from "../layout/HOC";
import {
  Table,
  Modal,
  Form,
  Button,
  FloatingLabel
} from "react-bootstrap";
import axios from "axios";
import {toast} from "react-toastify";

const PrivacyPolicy = () => {
  const [modalShow, setModalShow] = useState(false);
  const [privacy, setPrivacy] = useState([]);
  const token = localStorage.getItem("token");

  const getPrivacy = async()=>{
    const url = "https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/privacy";
    try{
      const res = await axios.post(url, {},{
        headers : {Authorization :`Bearer ${token}`}
      })
      setPrivacy(res?.data);
    }catch(err){

    }
  }

  useEffect(()=>{
    getPrivacy();
  },[])

  function MyVerticallyCenteredModal(props) {
    const [content, setContent] = useState("");
    const handleSubmit = async(e)=>{
      e.preventDefault();
      const urla = "https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/createPrivacy";
      try{
        const res = await axios.post(urla, {content},{
          headers : {Authorization : `Bearer ${token}`}
        })
        getPrivacy();
        toast.success("Added successfully");
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
            Add Privacy Policy
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingTextarea2"
                label="Privacy Policy"
              >
                <Form.Control
                  as="textarea"
                  onChange = {(e)=>setContent(e.target.value)}
                  placeholder="Leave a comment here"
                />
              </FloatingLabel>
            </Form.Group>
            <Button
              style={{ backgroundColor: "#19376d", borderRadius: "0" }}
              type="submit"
              onClick = {handleSubmit}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const handleDelete = async(id)=>{
    const urld = `https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/privacy/${id}`;
    try{
      const res = await axios.delete(urld,{
        headers : {Authorization : `Bearer ${token}`}
      })
      getPrivacy();
      toast.success("Deleted successfully");
    }catch(err){
      toast.error(err.response.data.message);
    }
  }

  const [query, setQuery] = useState("");

  const searchPrivacy = !query ? privacy :
    privacy?.filter((item,i)=>{
      return item?.content?.toLowerCase()?.includes(query?.toLowerCase());
    })

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <section>
        <p className="headP">Dashboard / Privacy Policy</p>
        <div
          className="pb-4 sticky top-0  w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Privacy Policy 
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
        
              {/* Filter */}
              <div className="filterBox">
                <img
                  src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
                  alt=""
                />
                <input
                  type="search"
                  placeholder="Start typing to search   "
                  onChange={(e)=>setQuery(e.target.value)}
                />
              </div>

              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>Privacy Policy.</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      searchPrivacy?.map((ele,i)=>(
                        <tr key={i}>
                          <td>{ele?.content}</td>
                          <td>
                          <i
                            className="fa-sharp fa-solid fa-trash"
                            onClick={()=>handleDelete(ele?._id)}
                          ></i>
                        </td>
                        </tr>
                      ))
                    }
          
                  </tbody>
                </Table>
            
              </div>
     
        </section>
      </section>
    </>
  );
};

export default HOC(PrivacyPolicy);
