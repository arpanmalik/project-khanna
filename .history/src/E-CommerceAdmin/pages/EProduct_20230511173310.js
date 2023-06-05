/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import {
  Table,
  Modal,
  Form,
  Button,
  Badge,
  FloatingLabel,
  Spinner,
  Alert,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import SpinnerComp from "./Component/SpinnerComp";

const EProduct = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [edit, setEdit] = useState(false);
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [ImageCont, setImageCont] = useState([]);
  const [openCarouselModal, setOpenCarouselModal] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [ bigId , setBigId ]  = useState("")

  // Pagination
  const [currentPage2, setCurrentPage2] = useState(1);
  const [postPerPage2] = useState(10);
  const lastPostIndex2 = currentPage2 * postPerPage2;
  const firstPostIndex2 = lastPostIndex2 - postPerPage2;

  let pages2 = [];

  const TotolData = query
    ? data?.filter(
        (i) =>
          i?.product_name?.toLowerCase().includes(query?.toLowerCase()) ||
          i?.quantity?.toString()?.toLowerCase().includes(query?.toLowerCase())
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
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:8886/api/product/"
      );
      setData(data?.stats?.ProducData.reverse());
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [id, setId] = useState("");
    const [asin, setAsin] = useState("");
    const [product_name, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [priceDiscount, setPriceDiscount] = useState("");
    const [bullet_text, setBulletText] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [manyImages, setManyImages] = useState([]);
    const [imageArray, setImageArray] = useState([]);
    const [uploadMessage, setUploadMessage] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [categoryData, setCategoryData] = useState([]);

    const fetchAllCategory = async () => {
      try {
        const { data } = await axios.get(
          "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:8886/api/category"
        );
        setCategoryData(data.categories);
      } catch (e) {
        console.log("Category Err => ", e);
      }
    };
    const token = localStorage.getItem("AdminToken")

    useEffect(() => {
      if (props.show) {
        fetchAllCategory();
      }
    }, [props]);

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:8886/api/product/",
          {
            product_name,
            description,
            category,
            price,
            priceDiscount,
            id,
            asin,
            images: [imageArray],
            bullet_text,
            quantity,
          }
        );
        console.log(data);
        setSuccessMessage(true);
        fetchData();
      } catch (e) {
        console.log(e);
      }
    };

    const putHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.patch(
          `http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:8886/api/product/${bigId}/details`,
          {
            product_name,
            description,
            category,
            price,
            priceDiscount,
            id,
            asin,
            bullet_text,
            quantity,
          } ,{
            headers : {
              Authorization : `Bearer ${token}`
            }
          }
        );
        console.log(data);
        toast.success('Product Updated Successfully')
        fetchData();
        props.onHide()
      } catch (e) {
        console.log(e);
      }
    };

    const uploadImages = (e) => {
      const data = new FormData();
      setLoadingMessage(true);
      Array.from(manyImages).forEach((img) => {
        data.append("file", img);
        data.append("upload_preset", "ml_default");
        data.append("cloud_name", "dbcnha741");
        fetch("https://api.cloudinary.com/v1_1/dbcnha741/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            setImageArray((prevArray) => [...prevArray, data.url]);
            setUploadMessage(true);
            setLoadingMessage(false);
          })
          .catch((err) => {
            console.log(err);
            setLoadingMessage(false);
          });
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
          <Form onSubmit={ edit? putHandler : postHandler}>
            {successMessage ? (
              <Alert variant="success">Product Added SuccessFully</Alert>
            ) : (
              ""
            )}
            {loadingMessage ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              ""
            )}
            {uploadMessage ? <Alert>Image Uploaded SuccessFully</Alert> : ""}

              {edit ?
              "" :
              <div className="d-flex gap-2" style={{ alignItems: "center" }}>
              <Form.Group className="mb-3">
                <Form.Label>Product Images</Form.Label>
                <Form.Control
                  type="file"
                  required
                  multiple
                  onChange={(e) => setManyImages(e.target.files)}
                />
              </Form.Group>

              <Button
                style={{ height: "40px", marginTop: "15px" }}
                onClick={() => uploadImages()}
              >
                Upload
              </Button>
            </div>
              }

          

            <Form.Group className="mb-3">
              <Form.Label> Product Name</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setProductName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="number"
                required
                onChange={(e) => setId(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>ASIN</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setAsin(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <FloatingLabel controlId="floatingTextarea2" label="Description">
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                min={0}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price Discount</Form.Label>
              <Form.Control
                type="number"
                min={0}
                required
                onChange={(e) => setPriceDiscount(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Bullet Text</Form.Label>
              <FloatingLabel controlId="floatingTextarea2">
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  onChange={(e) => setBulletText(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label> Category</Form.Label>
              <Form.Select
                aria-label="Default select example"
                required
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>-- Select Category --</option>
                {categoryData?.map((i, index) => (
                  <option key={index} value={i._id}>
                    {" "}
                    {i.name}{" "}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                min={0}
                required
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>

            <Button className="btn" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  function MyVerticallyCenteredModal2(props) {
    const [singleProduct, setSingleProduct] = useState([]);

    const fetchProductById = async () => {
      try {
        const { data } = await axios.get(
          `http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:8886/api/product/${id}`
        );
        setSingleProduct(data.product);
      } catch (e) {
        console.log(e);
      }
    };

    useEffect(() => {
      if (props.show) {
        fetchProductById();
      }
    }, [props]);

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
            Product{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {singleProduct?.product_name ? (
            <p className="View">
              {" "}
              <strong> Product Name : </strong> {singleProduct?.product_name}{" "}
            </p>
          ) : (
            ""
          )}
          {singleProduct?.asin ? (
            <p className="View">
              {" "}
              <strong>Asin : </strong> {singleProduct?.asin}
            </p>
          ) : (
            ""
          )}
          {singleProduct?.id ? (
            <p className="View">
              {" "}
              <strong>Id : </strong> {singleProduct?.id}{" "}
            </p>
          ) : (
            ""
          )}

          {singleProduct?.description ? (
            <p className="View">
              {" "}
              <strong>Description : </strong> {singleProduct?.description}{" "}
            </p>
          ) : (
            ""
          )}

          {singleProduct?.brand ? (
            <p className="View">
              {" "}
              <strong>Brand : </strong> {singleProduct?.brand}{" "}
            </p>
          ) : (
            ""
          )}

          {singleProduct?.color ? (
            <p className="View">
              {" "}
              <strong>Color : </strong> {singleProduct?.color}{" "}
            </p>
          ) : (
            ""
          )}

          {singleProduct?.bullet_text?.[0] ? (
            <p className="View">
              {" "}
              <strong>Bullet Text : </strong>{" "}
              {singleProduct?.bullet_text?.map((i, index) => (
                <ul key={index} style={{ listStyle: "disc" }}>
                  <li> {i} </li>
                </ul>
              ))}{" "}
            </p>
          ) : (
            ""
          )}
        </Modal.Body>
      </Modal>
    );
  }

  // Carousel Modal
  function CarouselModal(props) {
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel
            autoPlay={true}
            interval={1000}
            showThumbs={false}
            infiniteLoop={true}
            swipeable={true}
            stopOnHover={true}
            showStatus={false}
            className="ModalCarousel"
          >
            {ImageCont.map((img, index) => (
              <div key={index} className="ModalCarouselImages">
                <img src={img} alt="" />
              </div>
            ))}
          </Carousel>
        </Modal.Body>
      </Modal>
    );
  }

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:8886/api/product/${id}`
      );
      console.log(data);
      fetchData();
      toast.success("Product Deleted SuccessFully");
    } catch (e) {
      console.log(e);
    }
  };

  function uploadExcel() {
    const target = document.getElementById("excel");
    target.click();
    UploadFile();
  }

  const UploadFile = async (e) => {
    const fd = new FormData();
    fd.append("file", fileUrl);
    try {
      const { data } = await axios.post(
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:8886/api/product/add",
        fd
      );
      console.log(data);
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

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

      <CarouselModal
        show={openCarouselModal}
        onHide={() => setOpenCarouselModal(false)}
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
          All Product's ( Total : {data?.length} )
        </span>
        <div className="d-flex gap-1">
          <input
            type="file"
            id="excel"
            style={{ display: "none" }}
            onChange={(e) => setFileUrl(e.target.files[0])}
          />
          <button
            onClick={() => {
              uploadExcel();
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
          >
            Upload
          </button>
          <button
            onClick={() => {
              setEdit(false);
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
          >
            Add Product
          </button>
        </div>
      </div>

      <section className="sectionCont">
        {data?.length === 0 || !data ? (
          <SpinnerComp />
        ) : (
          <>
            <div className="filterBox">
              <img
                src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
                alt=""
              />
              <input
                type="search"
                placeholder="Start typing to search for products"
                onChange={(e) => setQuery(e.target.value)}
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
                  {slicedData?.map((i, index) => (
                    <tr key={index}>
                      <td> #{index + 1} </td>
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setImageCont(i.image_url);
                          setOpenCarouselModal(true);
                        }}
                      >
                        <Carousel
                          autoPlay={true}
                          interval={1000}
                          className="ImageCarousel"
                          showThumbs={false}
                          infiniteLoop={true}
                          swipeable={true}
                          stopOnHover={true}
                          showStatus={false}
                        >
                          {i.image_url.map((img, index) => (
                            <div key={index} className="CarouselImages">
                              <img src={img} alt="" />
                            </div>
                          ))}
                        </Carousel>
                      </td>

                      <td> {i.product_name?.substr(0, 10) + "..."} </td>
                      <td></td>
                      <td> ₹{i.price} </td>
                      <td> {i.priceDiscount}%</td>
                      <td>
                        {i.quantity >= 10 ? (
                          <Badge bg="success">{i.quantity} In Stock</Badge>
                        ) : (
                          <Badge bg="danger">{i.quantity} In Stock</Badge>
                        )}
                      </td>
                      <td> {i.priceDiscount}</td>

                      <td>
                        <span className="flexCont">
                          <i
                            className="fa-solid fa-pen-to-square"
                            onClick={() => {
                              setBigId(i._id)
                              setEdit(true);
                              setModalShow(true);
                            }}
                          ></i>
                          <i
                            className="fa-solid fa-eye"
                            onClick={() => {
                              setId(i._id);
                              setModalShow2(true);
                            }}
                          ></i>
                          <i
                            className="fa-sharp fa-solid fa-trash"
                            onClick={() => deleteHandler(i._id)}
                          ></i>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

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
                  className={
                    currentPage2 === pages2?.length ? "activePage" : ""
                  }
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
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default HOC(EProduct);
