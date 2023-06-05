/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import {
  Table,
  Modal,
  Form,
  Button,
  FloatingLabel,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const ECategory = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const UserId = localStorage.getItem("AdminId");
  const [id, setId] = useState("");
  const [edit, setEdit] = useState("");

  // Pagination and Filter
  const [query, setQuery] = useState("");
  const [currentPage2, setCurrentPage2] = useState(1);
  const [postPerPage2] = useState(10);
  const lastPostIndex2 = currentPage2 * postPerPage2;
  const firstPostIndex2 = lastPostIndex2 - postPerPage2;

  let pages2 = [];

  const TotolData = query
    ? data?.filter(
        (i) =>
          i?.name?.toLowerCase().includes(query?.toLowerCase()) ||
          i?.email?.toLowerCase().includes(query?.toLowerCase())
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
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:8886/api/category"
      );
      setData(data.categories);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:8886/api/category/${id}`
      );
      toast.success(data.message);
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [description, setDesc] = useState("");

    const postHandler = async (e) => {
      e.preventDefault();
      const fd = new FormData();
      fd.append("image", image);
      fd.append("name", name);
      fd.append("description", description);
      fd.append("userId", UserId);
      try {
        const { data } = await axios.post(
          "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:8886/api/category",
          fd
        );
        toast.success(`${data?.category?.name} Added `);
        fetchData();
        props.onHide();
      } catch (e) {
        console.log(e);
      }
    };

    const putHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.patch(
          `http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:8886/api/category/${id}`,
          {
            name,
            description,
          }
        );
        toast.success(data.message);
        fetchData();
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
            {edit ? "Edit Category" : " Add Category"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {edit ? (
            <Form onSubmit={putHandler}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <FloatingLabel
                controlId="floatingTextarea2"
                label="Description"
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  onChange={(e) => setDesc(e.target.value)}
                />
              </FloatingLabel>

              <Button
                style={{ backgroundColor: "#19376d", borderRadius: "0" }}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          ) : (
            <Form onSubmit={postHandler}>
              <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  required
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <FloatingLabel
                controlId="floatingTextarea2"
                label="Description"
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  onChange={(e) => setDesc(e.target.value)}
                />
              </FloatingLabel>

              <Button
                style={{ backgroundColor: "#19376d", borderRadius: "0" }}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          )}
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

      <section>
        <p className="headP">Dashboard / Category</p>
        <div
          className="pb-4   w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Category's ( Total : {data?.length} )
          </span>
          <button
            onClick={() => {
              setEdit(false);
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
          >
            Add Category
          </button>
        </div>

        <section className="sectionCont">
          {data?.length === 0 || !data ? (
            <Alert>Categories Not Found</Alert>
          ) : (
            <>
              <div className="filterBox">
                <img
                  src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
                  alt=""
                />
                <input
                  type="search"
                  placeholder="Start typing to search"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>SNo.</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Added By</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slicedData?.map((i, index) => (
                      <tr key={index}>
                        <td>#{index + 1} </td>
                        <td>
                          <span className="flexCont">
                            <img src={i.image} alt="" />
                            <p> {i.name} </p>
                          </span>
                        </td>
                        <td>{i.description} </td>
                        <td>{i.userId?.name} </td>
                        <td>
                          {" "}
                          <span className="flexCont">
                            <i
                              className="fa-solid fa-pen-to-square "
                              onClick={() => {
                                setId(i._id);
                                setEdit(true);

                                setModalShow(true);
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
      </section>
    </>
  );
};

export default HOC(ECategory);
