/** @format */

import React, { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import HOC from "../layout/HOC";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [adminCount, setAdminCount] = useState([]);
  const [userCount, setUserCount] = useState([]);
  const [categoryCount, setCategoryCount] = useState("");
  const [ productCount , setProductCount ] = useState("")
  const [ orderCount , setOrderCount ] = useState("")

  const fetchAdmin = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:8886/api/user"
      );
      setAdminCount(data.users?.filter((i) => i?.role.includes("admin")));
      setUserCount(data.users?.filter((i) => i?.role.includes("user")));
     
    } catch (e) {
      console.log(e);
    }
  };

  const fetchCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:8886/api/category"
      );
      setCategoryCount(data.categories.length);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:8886/api/product/"
      );
      setProductCount(data.stats.ProducData.length);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchOrder = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:8886/api/order"
      );
      setOrderCount(data.orders.length);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchAdmin();
    fetchCategory();
    fetchProduct()
    fetchOrder()
  }, []);

  const card = [
    {
      progress: "bg-green-400",
      title: "Total Users",
      number: userCount?.length,
      icon: (
        <i
          className="fa-solid fa-user text-2xl"
          style={{ color: "#4099ff" }}
        ></i>
      ),
      bg: "#4099ff",
      link: "/Customer",
    },
    {
      progress: "bg-green-400",
      title: "All Admin",
      number: adminCount?.length,
      icon: <FiUser className="text-2xl text-[#29cccc]" />,
      bg: "#29cccc",
      link: "/Admin",
    },
    {
      progress: "bg-green-400",
      title: "All Product",
      number: productCount,
      icon: <i class="fa-solid fa-cart-shopping text-2xl text-[#3c335d]"></i>,
      bg: "#3c335d",
      link: "/Product",
    },
    {
      progress: "bg-green-400",
      title: "All category",
      number: categoryCount,
      icon: <i className=" fa-brands fa-slack text-2xl text-[#64878e]"></i>,
      bg: "#64878e",
      link: "/Category",
    },
  
    {
      progress: "bg-green-400",
      title: "All orders",
      number: orderCount,
      icon: (
        <i className=" fa-solid fa-bag-shopping text-2xl text-[#1b6975]"></i>
      ),
      bg: "#1b6975",
      link: "/Orders",
    },
  ];
  return (
    <>
      <section className="grid md:grid-cols-4 grid-cols-2 gap-y-6 gap-x-4">
        {card.map((card, index) => {
          return (
            <div
              className="px-5 py-8 bg-slate-200 space-y-2 shadow-xl flex flex-col  rounded-md cardDiv"
              key={index}
              style={{
                backgroundColor: `${card.bg}`,
                textTransform: "uppercase",
              }}
              onClick={() => navigate(`${card.link}`)}
            >
              <div className="grid  justify-between grid-cols-4">
                <div className="flex flex-col col-span-3 space-y-1">
                  <span
                    className="tracking-widest text-gray-900"
                    style={{ color: "#fff" }}
                  >
                    {card.title}
                  </span>
                  <span
                    className="tracking-wider text-gray-700 text-xl md:text-2xl font-semibold"
                    style={{ color: "#fff" }}
                  >
                    {card.number}
                  </span>
                </div>
                <div className="flex rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-white justify-center items-center iCOn">
                  {card.icon}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default HOC(Dashboard);
