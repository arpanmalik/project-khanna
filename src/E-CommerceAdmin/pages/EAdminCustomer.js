/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Table, Modal, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const EAdminCustomer = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [edit, setEdit] = useState("");
  const [data, setData] = useState([]);
  // Pagination and Filter
  const [query, setQuery] = useState("");
  const [currentPage2, setCurrentPage2] = useState(1);
  const [postPerPage2] = useState(10);
  const lastPostIndex2 = currentPage2 * postPerPage2;
  const firstPostIndex2 = lastPostIndex2 - postPerPage2;

  const token = localStorage.getItem("token");

  const getSubCategory = async () => {
    const url =
      "https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/subcategory";
    try {
      const res = await axios.post(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res?.data?.data);
      setData(res?.data?.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  let pages2 = [];

  const TotolData = query
    ? data?.filter(
        (i) =>
          i?.name?.toLowerCase().includes(query?.toLowerCase()) ||
          i?.email?.toLowerCase().includes(query?.toLowerCase())
      )
    : data;

  useEffect(() => {
    getSubCategory();
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

  function MyVerticallyCenteredModal(props) {
    const [category, setCategory] = useState([]);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [categoryId, setCat] = useState("");
    const getAllCat = async () => {
      const url =
        "https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/category";
      try {
        const res = await axios.post(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategory(res?.data?.data);
        console.log(res?.data?.data);
      } catch (err) {
        console.log(err);
      }
    };
    useEffect(() => {
      getAllCat();
    }, []);

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
          setImage(data.url);
          console.log(data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const urla =
        "https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/createSubcategory";
      try {
        const res = await axios.post(
          urla,
          {
            name,
            image,
            categoryId,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Sub category added successfully");
        getSubCategory();
      } catch (err) {
        console.log(err.message);
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
            {edit ? "Edit Category" : " Create New Category"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => postthumbImage(e)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setCat(e.target.value)}
              className="mb-3"
            >
              <option>-- Select Category --</option>
              {category?.map((ele, i) => (
                <option value={ele?._id}>{ele?.name}</option>
              ))}
            </Form.Select>
            <Button
              style={{ backgroundColor: "#19376d", borderRadius: "0" }}
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const [showt, setShowt] = useState(false);
  const [id, setId] = useState("");

  const handleUpdate = (id) => {
    setId(id);
    setShowt(true);
  };

  function MyVerticallyCenteredModal2(props) {
    const [category, setCategory] = useState([]);
    const [name2, setName] = useState("");
    const [image2, setImage] = useState("");
    const [categoryId2, setCat] = useState("");

    const [name, setName2] = useState("");
    const [image, setImage2] = useState("");
    const [categoryId, setCat2] = useState("");

    const getCatId = async () => {
      const url = `https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/subcategory/${id}`;

      try {
        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        //setCategory(res?.data?.data);
        //console.log(res?.data?.data);
        setName2(res?.data?.data?.name);
        setImage2(res?.data?.data?.image);
        setCat2(res?.data?.data?.categoryId);
      } catch (err) {
        console.log(err);
      }
    };

    const getAllCat = async () => {
      const url =
        "https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/category";
      try {
        const res = await axios.post(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategory(res?.data?.data);
        console.log(res?.data?.data);
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
      getCatId();
      getAllCat();
    }, []);

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
          setImage(data.url);
          console.log(data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const urla = `https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/subcategory/${id}`;
      const name3 = name2===""?name:name2;
      const image3 = image2==="" ? image: image2;
      const categoryId3 = categoryId2==="" ? categoryId : categoryId2;
      try {
        //console.log(name3, image3, categoryId3);
        const res = await axios.patch(
          urla,
          {
            name:name3,
            image:image3,
            categoryId:categoryId3,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Sub category updated successfully");
        getSubCategory();
      } catch (err) {
        console.log(err.message);
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
            {edit ? "Edit Category" : " Create New Category"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => postthumbImage(e)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setCat(e.target.value)}
              className="mb-3"
            >
              <option>-- Select Category --</option>
              {category?.map((ele, i) => (
                <option value={ele?._id}>{ele?.name}</option>
              ))}
            </Form.Select>
            <Button
              style={{ backgroundColor: "#19376d", borderRadius: "0" }}
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const handleDelete = async (id) => {
    const urld = `https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/subcategory/${id}`;
    try {
      const res = await axios.delete(urld, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getSubCategory();
      toast.success("Deleted Successfully");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <MyVerticallyCenteredModal2 show={showt} onHide={() => setShowt(false)} />

      <section>
        <p className="headP">Dashboard / Sub-Category</p>
        <div
          className="pb-4   w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Sub-Category's ( Total : {data?.length} )
          </span>
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

        <section className="sectionCont">
          {data?.length === 0 || !data ? (
            <Alert>Sub-Categories Not Found</Alert>
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
                      <th>Category</th>
                      <th>Added By</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slicedData?.map((i, index) => (
                      <tr key={index}>
                        <td>#{index + 1} </td>
                        <td>
                          <span className="flexCont">
                            <img src={i?.image} alt="" />
                            <p> {i?.name} </p>
                          </span>
                        </td>
                        <td>{i?.categoryId?.name} </td>
                        <td>{i?.userId?.email} </td>
                        <td>
                          {" "}
                          <span className="flexCont">
                            <i
                              className="fa-solid fa-pen-to-square "
                              onClick={() => {
                                handleUpdate(i?._id);
                              }}
                            ></i>
                            <i
                              className="fa-sharp fa-solid fa-trash"
                              onClick={() => handleDelete(i?._id)}
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
      </section>
    </>
  );
};

export default HOC(EAdminCustomer);
