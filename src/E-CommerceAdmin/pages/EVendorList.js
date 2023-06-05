/** @format */
import React, {useState, useEffect} from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import HOC from "../layout/HOC";
import axios from "axios";
import { toast } from "react-toastify";

const EVendorList = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [horoscope, setHoroscope] = useState([]);
  const token = localStorage.getItem("token");

  const getHoroscopes = async()=>{
    const url = "https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/horoscopes";
    try{
     // console.log(token);
      const res = await axios.post(url,{}, {
        headers:{Authorization:`Bearer ${token}`}
      })
      
      setHoroscope(res?.data?.data);
     // console.log(res?.data?.data);
    }catch(err){
      console.log(err.message);
    }
  }

  useEffect(()=>{
    getHoroscopes();
  },[]);

  function MyVerticallyCenteredModal(props) {
    const [horoscope, setHoroscope] = useState("");
    const [professional, setProfessional] = useState("");
    const [emotions, setEmotions] = useState("");
    const [health, setHealth] = useState("");
    const [travel, setTravel] = useState("");
    const [luck, setLuck] = useState("");
    const [duration, setDuration] = useState("");
    const [rashi, setRashi] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = async(e)=>{
      e.preventDefault();
      const urla = "https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/createHoroscopes";
      console.log(horoscope, professional, emotions,health, travel, luck, duration, rashi);
      try{
        console.log(horoscope, professional, emotions,health, travel, luck, duration, rashi);
        const res = await axios.post(urla, {
          horoscope, professional, emotions, health, travel, luck, duration,
          rashi, date
        },{
          headers:{Authorization :`Bearer ${token}`}
        })
        getHoroscopes();
        toast.success("Added Horoscopes successfully");
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
            Create New
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Horoscope</Form.Label>
              <Form.Control type="text" onChange={(e)=>setHoroscope(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Professional</Form.Label>
              <Form.Control type="text" onChange={(e)=>setProfessional(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Emotions</Form.Label>
              <Form.Control type="text" onChange={(e)=>setEmotions(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Health</Form.Label>
              <Form.Control type="text" onChange={(e)=>setHealth(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Travel </Form.Label>
              <Form.Control type="text" onChange={(e)=>setTravel(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Luck</Form.Label>
              <Form.Control type="text" onChange={(e)=>setLuck(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duration</Form.Label>
              <Form.Control type="text" onChange={(e)=>setDuration(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rashi</Form.Label>
              <Form.Control type="text" onChange={(e)=>setRashi(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" onChange={(e)=>setDate(e.target.value)} required />
            </Form.Group>

            <Button variant="outline-success" onClick={handleSubmit} type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }

  const handleDelete = async(id)=>{
    const urld = `https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/horoscopes/${id}`;
    try{
      const res = await axios.delete(urld,{
        headers: {Authorization : `Bearer ${token}`}
      })
      getHoroscopes();
      toast.success("Deleted Successfully");
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

      <p className="headP">Dashboard / Horoscope</p>
      <div
        className="pb-4 sticky top-0  w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase "
          style={{ fontSize: "1.5rem" }}
        >
          All Horoscope
        </span>
        <button
          onClick={() => {
            setModalShow(true);
          }}
          className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
        >
          Create New
        </button>
      </div>

      <section className="sectionCont">
        <div className="filterBox">
          <img
            src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
            alt=""
          />
          <input type="search" placeholder="Start typing to search" />
        </div>

        <div className="overFlowCont">
          <Table>
            <thead>
              <tr>
                <th>SNo.</th>
                <th>Horoscope</th>
                <th> Professional </th>
                <th>Emotions</th>
                <th>Health </th>
                <th>Travel</th>
                <th>Luck </th>
                <th>Duration</th>
                <th>Rashi</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {
                   horoscope?.map((ele,i)=>(
                    <tr>
                      <td>{i+1}</td>
                      <td>{ele?.horoscope}</td>
                      <td>{ele?.professional}</td>
                      <td>{ele?.emotions}</td>
                      <td>{ele?.health}</td>
                      <td>{ele?.travel}</td>
                      <td>{ele?.luck}</td>
                      <td>{ele?.duration}</td>
                      <td>{ele?.rashi}</td>
                      <td>{ele?.date}</td>
                      <td>
                  <i className="fa-solid fa-trash" onClick={()=>handleDelete(ele?._id)}/>
                </td>
                    </tr>
                  ))
                }
                
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default HOC(EVendorList);
