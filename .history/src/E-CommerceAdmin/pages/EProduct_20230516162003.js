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
  const [openCarouselModal, setOpenCarouselModal] = useState(false);




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
            {" "}
            {edit ? "Edit Product" : " Add New Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
       
              {edit ?
              "" :
              <div className="d-flex gap-2" style={{ alignItems: "center" }}>
              <Form.Group className="mb-3">
                <Form.Label>Product Images</Form.Label>
                <Form.Control
                  type="file"
                  required
                  multiple
                />
              </Form.Group>

              <Button
                style={{ height: "40px", marginTop: "15px" }}
           
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
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="number"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>ASIN</Form.Label>
              <Form.Control
                type="text"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <FloatingLabel controlId="floatingTextarea2" label="Description">
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                min={0}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price Discount</Form.Label>
              <Form.Control
                type="number"
                min={0}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Bullet Text</Form.Label>
              <FloatingLabel controlId="floatingTextarea2">
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label> Category</Form.Label>
              <Form.Select
                aria-label="Default select example"
                required
              >
                <option>-- Select Category --</option>
              
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                min={0}
                required
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





  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
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
