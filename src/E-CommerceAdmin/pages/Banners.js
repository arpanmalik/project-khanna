/** @format */

import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import HOC from "../layout/HOC";
import axios from "axios";

const Banners = () => {
  const [modalShow, setModalShow] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const token = localStorage.getItem("token");
  const getBlogs = async () => {
    const url =
      "https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/blogs";
    try {
      const res = await axios.get(url);
      console.log(res?.data?.data);
      setBlogs(res?.data?.data);
    } catch (err) {}
  };

  useEffect(() => {
    getBlogs();
  }, []);

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
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState("");

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
          const imgrl = data.url;
          setImage(data.url);
         // console.log(image);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const handleAddTag = ()=>{
      setTags((prev)=>[...prev, tag]);
    }
    const handleSubmit = async(e)=>{
      e.preventDefault();
      const urla = "https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/blogs";
      try{
        const res = await axios.post(urla, {title, image, content, tags},{
          headers : {Authorization :`Bearer ${token}`}
        })
        console.log(res?.data);
        getBlogs();
      }catch(err){

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
          <Modal.Title id="contained-modal-title-vcenter">Add Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={(e)=>postthumbImage(e)}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" onChange={(e)=>setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control type="text" onChange={(e)=>setContent(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tags</Form.Label>
              <Form.Control type="text" onChange={(e)=>setTag(e.target.value)} />
              <Button variant="outline-success" onClick={handleAddTag}>Add Tags</Button>
            </Form.Group>
            <Button variant="outline-success" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const handleDelete = async(id)=>{
    const urld = `https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/blogs/${id}`;
    try{
      const res = await axios.delete(urld, {
        headers : {Authorization : `Bearer ${token}`}
      })
      getBlogs();
    }catch(err){

    }
  }

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />{" "}
      <p className="headP">Dashboard / Blog</p>
      <div
        className="pb-4 sticky top-0  w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase "
          style={{ fontSize: "1.5rem" }}
        >
          All Blogs ( Total : {blogs?.length} )
        </span>
        <button
          onClick={() => setModalShow(true)}
          className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
        >
          + Create New
        </button>
      </div>
      <div className="gridCont">
        {blogs.map((i, index) => (
          <div key={index}>
            <img src={i?.image} alt="" />
            <p style={{ margin: "10px", textAlign: "center" }}>{i?.title}</p>
            <button className="delete-Btn" onClick={()=>handleDelete(i?._id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default HOC(Banners);
