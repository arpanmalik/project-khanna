/** @format */

import React, { useState, useEffect } from "react";
import HOC from "../layout/HOC";
import { Table, Modal, Form, Button, FloatingLabel } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { toast } from "react-toastify";
import axios from "axios";

const EProduct = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const token = localStorage.getItem("token");
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const url =
      "https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/product";
    try {
      const res = await axios.post(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res?.data?.data);
      console.log(res?.data?.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = async(id)=>{
    const urld = `https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/product/${id}`;
    try{
      const res = await axios.delete(urld,
        {
          headers:{Authorization:`Bearer ${token}`}
        }
      )
      toast.success("Product deleted successfully");
      getProducts();
    }catch(err){
      toast.error(err.response.data.message);
    }
  }

  function MyVerticallyCenteredModal(props) {
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [productName, setName] = useState("");
    const [productImages, setImage] = useState([]);
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const getCategory = async()=>{
      const url = "https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/category";
      try{
        const res = await axios.post(url,
          {
            headers:{Authorization:`Bearer ${token}`}
          }
        )
        setCategories(res?.data?.data);
      }catch(err){
        console.log(err.message);
      }
    }
    useEffect(()=>{
      getCategory();
    },[])

    const handleSubmit = async(e)=>{
      e.preventDefault();
      const url = "https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/createProduct";
      try{
        const res = await axios.post(url,
          {
            categoryId, productName, productImages, price, discount,
            description, stock
          },
          {
            headers:{Authorization:`Bearer ${token}`}
          }
        )
        console.log(res?.data);
        toast.success("Product addedd successfully");
        getProducts();
      }catch(err){
        alert(err.response.data.message);
      }
    }

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
          setImage(prev=>[...prev, imgrl])
         // console.log(image);
        })
        .catch((err) => {
          console.log(err);
        });
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
            {edit ? "Edit Product" : " Add New Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {edit ? (
              ""
            ) : (
              <div className="d-flex gap-2" style={{ alignItems: "center" }}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Images</Form.Label>
                  <Form.Control type="file" required
                    onChange={(e) => postthumbImage(e)}
                  multiple />
                </Form.Group>

                <Button style={{ height: "40px", marginTop: "15px" }}>
                  Upload
                </Button>
              </div>
            )}

            <Form.Group className="mb-3">
              <Form.Label> Product Name</Form.Label>
              <Form.Control type="text" onChange={(e)=>setName(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <FloatingLabel controlId="floatingTextarea2" label="Description">
                <Form.Control
                  as="textarea"
                  onChange={(e)=>setDescription(e.target.value)}
                  placeholder="Leave a comment here"
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" min={0} onChange={(e)=>setPrice(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Discount</Form.Label>
              <Form.Control type="number" min={0} onChange={(e)=>setDiscount(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label> Category</Form.Label>
              <Form.Select aria-label="Default select example" onChange={(e)=>setCategoryId(e.target.value)} required>
                <option>-- Select Category --</option>
                {
                  categories?.map((ele,i)=>(
                    <option value={ele?._id}>{ele?.name}</option>
                  ))
                }
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control type="number" min={0} onChange={(e)=>setStock(e.target.value)} required />
            </Form.Group>

            <Button className="btn" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const [showt, setShowt] = useState(false);
  const [id, setId] = useState("");
  const handleEdit = (id)=>{
    setId(id);
    setShowt(true);
  }

  function MyVerticallyCenteredModal2(props) {
    const [categories, setCategories] = useState([]);
    const [categoryId2, setCategoryId] = useState("");
    const [productName2, setName] = useState("");
    const [productImages2, setImage] = useState([]);
    const [price2, setPrice] = useState("");
    const [discount2, setDiscount] = useState("");
    const [stock2, setStock] = useState("");
    const [description2, setDescription] = useState("");
    const [data, setData] = useState({});
    const getCategory = async()=>{
      const url = "https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/category";
      try{
        const res = await axios.post(url,
          {
            headers:{Authorization:`Bearer ${token}`}
          }
        )
        setCategories(res?.data?.data);
      }catch(err){
        console.log(err.message);
      }
    }
    const getProductId = async()=>{
      const url = `https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/product/${id}`;
      try{
        const res = await axios.get(url,{
          headers:{Authorization:`Bearer ${token}`}
        })
        setData(res?.data?.data);
      }catch(err){

      }
    }
    useEffect(()=>{
      getCategory();
      getProductId();
    },[])

    const handleSubmit = async(e)=>{
      e.preventDefault();
      const categoryId = categoryId2==="" ? data?.categoryId : categoryId2;
      const productName = productName2==="" ? data?.productName : productName2;
      const productImages = productImages2===[] ? data?.productImages : productImages2;
      const price = price2==="" ? data?.price : price2;
      const discount = discount2==="" ? data?.discount : discount2;
      const description = description2==="" ? data?.description : description2;
      const stock = stock2==="" ? data?.stock : stock2;
      const url = `https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/product/${id}`;
      try{
        const res = await axios.patch(url,
          {
            categoryId, productName,
            productImages, price, discount,
            description, stock
          },
          {
            headers:{Authorization:`Bearer ${token}`}
          }
        )
        console.log(res?.data);
        toast.success("Product updated successfully");
        getProducts();
      }catch(err){
        alert(err.response.data.message);
      }
    }

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
          setImage(prev=>[...prev, imgrl])
         // console.log(image);
        })
        .catch((err) => {
          console.log(err);
        });
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
            {edit ? "Edit Product" : " Add New Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {edit ? (
              ""
            ) : (
              <div className="d-flex gap-2" style={{ alignItems: "center" }}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Images</Form.Label>
                  <Form.Control type="file" required
                    onChange={(e) => postthumbImage(e)}
                  multiple />
                </Form.Group>

                <Button style={{ height: "40px", marginTop: "15px" }}>
                  Upload
                </Button>
              </div>
            )}

            <Form.Group className="mb-3">
              <Form.Label> Product Name</Form.Label>
              <Form.Control type="text" onChange={(e)=>setName(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <FloatingLabel controlId="floatingTextarea2" label="Description">
                <Form.Control
                  as="textarea"
                  onChange={(e)=>setDescription(e.target.value)}
                  placeholder="Leave a comment here"
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" min={0} onChange={(e)=>setPrice(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Discount</Form.Label>
              <Form.Control type="number" min={0} onChange={(e)=>setDiscount(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label> Category</Form.Label>
              <Form.Select aria-label="Default select example" onChange={(e)=>setCategoryId(e.target.value)} required>
                <option>-- Select Category --</option>
                {
                  categories?.map((ele,i)=>(
                    <option value={ele?._id}>{ele?.name}</option>
                  ))
                }
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control type="number" min={0} onChange={(e)=>setStock(e.target.value)} required />
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
  const searchProduct = !query ? products : 
    products?.filter((item,i)=>{
      return item?.productName?.toLowerCase()?.includes(query?.toLowerCase());
    })

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

      <p className="headP">Dashboard / Products</p>

      <div
        className="pb-4  w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase"
          style={{ fontSize: "1.5rem" }}
        >
          All Product's
        </span>
        <div className="d-flex gap-1">
          <button
            onClick={() => {
              setEdit(false);
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
          >
            + Create New
          </button>
        </div>
      </div>

      <section className="sectionCont">
        <div className="filterBox">
          <img
            src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
            alt=""
          />
          <input
            type="search"
            placeholder="Start typing to search for products"
            onChange={(e)=>setQuery(e.target.value)}
          />
        </div>

        <div className="overFlowCont">
          <Table>
            <thead>
              <tr>
                <th>Sno.</th>
                <th>Image</th>
                <th>Title</th>
                <th>Added By</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Total Stock</th>
                <th>Category</th>
                <th> Options </th>
              </tr>
            </thead>
            <tbody>
              {searchProduct?.map((ele, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>
                    <img
                      src={ele?.productImages?.[0]}
                      alt=""
                      style={{ width: "100px" }}
                    />
                  </td>
                  <td>{ele?.productName}</td>
                  <td>{ele?.userId?.email}</td>
                  <td>{ele?.price}</td>
                  <td>{ele?.discount}</td>
                  <td>{ele?.stock}</td>
                  <td>{ele?.categoryId?.name}</td>
                  <td>
                          {" "}
                          <span className="flexCont">
                            <i
                              className="fa-solid fa-pen-to-square "
                              onClick={() => handleEdit(ele?._id)}
                            ></i>
                            <i className="fa-sharp fa-solid fa-trash" onClick={()=>handleDelete(ele?._id)}></i>
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

export default HOC(EProduct);
