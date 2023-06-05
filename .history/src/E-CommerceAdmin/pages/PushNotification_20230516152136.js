
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FloatingLabel,
  Form,
  Modal,
  Table,
} from "react-bootstrap";
import HOC from "../layout/HOC";

const PushNotification = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [query, setQuery] = useState("");
  const [currentPage2, setCurrentPage2] = useState(1);
  const [postPerPage2] = useState(10);
  const lastPostIndex2 = currentPage2 * postPerPage2;
  const firstPostIndex2 = lastPostIndex2 - postPerPage2;
  let pages2 = [];

  const data = [
    {
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem ",
    },
    {
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Is standard dummy text ever since the 1500s, ",
    },
    {
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem  ",
    },
    {
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
    },
    {
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
    },
    {
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
    },
    {
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
    },
    {
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
    },
    {
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
    },
    {
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
    },
    {
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
    },
    {
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
    },
  ];

  const TotolData = query
    ? data?.filter(
        (i) =>
          i?.message?.toLowerCase().includes(query?.toLowerCase()) ||
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
            Add Notification
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Form.Group className="mb-3">
              <Form.Label>Notification</Form.Label>
              <FloatingLabel controlId="floatingTextarea2">
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                />
              </FloatingLabel>
            </Form.Group>

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



  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <p className="headP">Dashboard / Push Notification</p>

      <div
        className="pb-4   w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase "
          style={{ fontSize: "1.5rem" }}
        >
          All Notification (Total : {data.length})
        </span>
        <button
          onClick={() => {
            setModalShow(true);
          }}
          className="md:py-2 px-3 md:px-4 py-1 rounded-sm  bg-[#19376d] text-white tracking-wider"
        >
          +  Create New
        </button>
      </div>
      <section className="sectionCont">
        {data?.length === 0 || !data ? (
          <Alert>No Data Found</Alert>
        ) : (
          <>
            {/* Filter */}
            <div className="filterBox">
              <img
                src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
                alt=""
              />
              <input
                type="search"
                placeholder="Start typing to search "
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="overFlowCont">
              <Table>
                <thead>
                  <tr>
                    <th>SNo.</th>
                    <th>Message</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {slicedData.map((i, index) => (
                    <tr key={index}>
                      <td> #{index + 1} </td>
                      <td> {i.message?.substring(0, 50) + " ..."} </td>
                      <td>
                        <span className="flexCont">
                          <i className="fa-solid fa-eye"></i>
                          <i className="fa-sharp fa-solid fa-trash"></i>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
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
                className={currentPage2 === pages2?.length ? "activePage" : ""}
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
          </>
        )}
      </section>
    </>
  );
};

export default HOC(PushNotification);
