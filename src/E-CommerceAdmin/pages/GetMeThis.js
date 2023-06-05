/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Alert, Button, Form, Modal, Spinner, Table } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import { toast } from "react-toastify";

const GetMeThis = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [data, setData] = useState([]);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [postPerPage2] = useState(10);
  const lastPostIndex2 = currentPage2 * postPerPage2;
  const firstPostIndex2 = lastPostIndex2 - postPerPage2;

  let pages2 = [];

  const TotolData = query
    ? data?.filter(
        (i) =>
          i?.description?.toLowerCase().includes(query?.toLowerCase())
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


  const fetchdata = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:8886/api/banner"
      );
      setData(data.banner);
    } catch (e) {
      console.log("Banner err=> ", e);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [description, setDesc] = useState("");
    const [image, setImage] = useState([]);
    const [uploadMessage, setUploadMessage] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState(false);
    const [manyImages, setManyImages] = useState([]);

    // Upload Multiple Images
    const uploadImages = () => {
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
            setImage((prevArray) => [...prevArray, data.url]);
            setUploadMessage(true);
            setLoadingMessage(false);
          })
          .catch((err) => {
            console.log(err);
            setLoadingMessage(false);
          });
      });
    };

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:8886/api/banner",
          {
            description,
            image,
          }
        );
        console.log(data);
        toast.success("Added");
        fetchdata();
        props.onHide();
      } catch (e) {
        console.log(e);
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
          <Modal.Title id="contained-modal-title-vcenter">
            {" "}
            Add Get Me This
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loadingMessage ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            ""
          )}
          {uploadMessage ? <Alert>Image Uploaded SuccessFully</Alert> : ""}

          <Form onSubmit={postHandler}>
            <div className="d-flex gap-2" style={{ alignItems: "center" }}>
              <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
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

            <Form.Select
              aria-label="Default select example"
              className="mb-3"
              onChange={(e) => setDesc(e.target.value)}
            >
              <option>-- Select Page --</option>
              <option value="GlobalGenie"> GlobalGenie </option>
              <option value="Baby-Mom">Baby & Mom </option>
              <option value="Beauty-Cosmetic"> Beauty & Cosmetics </option>
              <option vallue="Gadgets-Eelectronics">
                {" "}
                Gadgets & Eelectronics{" "}
              </option>
              <option value="Health-PersonalCare">
                {" "}
                Health & Personal Care{" "}
              </option>
              <option value="Lifestyle-Sports"> Lifestyle & Sports </option>
              <option value="Mens-GroomingEssentials">
                {" "}
                Men's Grooming Essentials{" "}
              </option>
              <option value="Home-Kitchen"> Home & Kitchen </option>
            </Form.Select>

            <Button
              style={{ backgroundColor: "#19376d", borderRadius: "0" }}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:8886/api/banner/${id}`
      );
      console.log(data);
      fetchdata();
      toast.success("Deleted");
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

      <p className="headP">Dashboard / Get Me This</p>

      <div
        className="pb-4 sticky top-0  w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase "
          style={{ fontSize: "1.5rem" }}
        >
          All Get Me This ( Total : {data.length} )
        </span>
        <button
          onClick={() => {
            setModalShow(true);
          }}
          className="md:py-2 px-3 md:px-4 py-1 rounded-sm  bg-[#19376d] text-white tracking-wider"
        >
          Add Get Me This
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
            placeholder="Start typing to Search"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="overFlowCont">
          <Table>
            <thead>
              <tr>
                <th>Sno.</th>
                <th>Banners</th>
                <th>Page</th>
                <th> Options </th>
              </tr>
            </thead>
            <tbody>
              {slicedData?.map((i, index) => (
                <tr key={index}>
                  <td> #{index + 1} </td>
                  <td>
                    <Carousel
                      autoPlay={true}
                      interval={1000}
                      className="BannerCarousel"
                      showThumbs={false}
                      infiniteLoop={true}
                      swipeable={true}
                      stopOnHover={true}
                      showStatus={false}
                    >
                      {i.image.map((img, index) => (
                        <div key={index} className="BannerCarouselImage">
                          <img src={img} alt="" />
                        </div>
                      ))}
                    </Carousel>
                  </td>

                  <td>/{i.description}</td>
                  <td>
                    <span className="flexCont">
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
        </div>

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
      </section>
    </>
  );
};

export default HOC(GetMeThis);
