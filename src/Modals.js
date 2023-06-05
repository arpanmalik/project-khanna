/** @format */

import { Button, Form, Modal } from "react-bootstrap";
import React, {useState, useEffect} from "react";
import axios from "axios";

export function UpdateProfile(props) {
  const url = `https://r-ravi-khanna-backend-new-at58.vercel.app/api/v1/admin/users/update`;
  const token = localStorage.getItem("token");
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cp, setCp] = useState("");

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(password != cp) {
      alert("Password does not match with confirm password!");
    }
    else{
    try{
      const res = await axios.post(url, {name, email, password},{
        headers : {Authorization : `Bearer ${token}`}
      })
      alert("Update Successfully");
      console.log(res?.data);
    }catch(err){

    }
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
          Update Profile Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label> User Name </Form.Label>
            <Form.Control type="text" onChange={(e)=>setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label> Email Address </Form.Label>
            <Form.Control type="email" onChange={(e)=>setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label> Password </Form.Label>
            <Form.Control type="password" onChange={(e)=>setPassword(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label> Confirm Password </Form.Label>
            <Form.Control type="password" onChange={(e)=>setCp(e.target.value)}/>
          </Form.Group>
          <Button variant="outline-success" onClick={handleSubmit} >Submit</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
