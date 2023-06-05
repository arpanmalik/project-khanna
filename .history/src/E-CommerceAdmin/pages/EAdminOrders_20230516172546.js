/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Badge, Button, Form, Modal, Table } from "react-bootstrap";
import HOC from "../layout/HOC";

const EAdminOrders = () => {

  return (
    <>
      <section>
        <p className="headP">Dashboard / Order</p>

        <div
          className="pb-4 sticky top-0  w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Order's 
          </span>
        </div>
        <section className="sectionCont">

          <div className="filterBox">
            <img
              src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
              alt=""
            />
            <input type="search" placeholder="Start typing to search"    />
          </div>
          <div className="overFlowCont">
            <Table>
              <thead>
                <tr>
                  <th>Number</th>
                  <th>User</th>
                  <th>Total Price</th>
                  <th>Payment Method</th>
                  <th>Status</th>
                  <th>Product Name</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#1</td>
                  <td>User</td>
                  <td>2,000</td>
                  <td>Cash</td>
                  <td>Pending</td>
                  <td>Item</td>
                </tr>
              </tbody>
            </Table>
          </div>
          

         
        </section>
      </section>
    </>
  );
};

export default HOC(EAdminOrders);
