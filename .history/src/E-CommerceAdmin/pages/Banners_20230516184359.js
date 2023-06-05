/** @format */

import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import HOC from "../layout/HOC";

const Banners = () => {
  const [ modalShow , setModalShow ] = useState(false)
  const data = [
    {
      img: "https://c4.wallpaperflare.com/wallpaper/295/163/719/anime-anime-boys-picture-in-picture-kimetsu-no-yaiba-kamado-tanjir%C5%8D-hd-wallpaper-preview.jpg",
    },
    {
      img: "https://wallpapercave.com/wp/wp8203971.jpg",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrkxuyWfQoPkIlAvvRRowppxPnmla0usying&usqp=CAU",
    },
    {
      img: "https://www.pixelstalk.net/wp-content/uploads/images5/Black-Goku-4K-Wallpaper-HD.jpg ",
    },
  ];
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
            Add Blog
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file"  />
            </Form.Group>
          <Button variant="outline-success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
    <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)}
 />        <p className="headP">Dashboard / Blog</p>

      <div
        className="pb-4 sticky top-0  w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase "
          style={{ fontSize: "1.5rem" }}
        >
          All Blogs ( Total : {data.length} )
        </span>
        <button     className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
      >+ Create New</button>
      </div>

      <div className="gridCont">
        {data.map((i, index) => (
          <div key={index}>
            <img src={i.img} alt="" />
            <p style={{margin : '10px' , textAlign : 'center'}} >Lorem Ipsum</p>
            <button className="delete-Btn">Button</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default HOC(Banners);
