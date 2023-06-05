/** @format */

import { FiUser } from "react-icons/fi";
import HOC from "../layout/HOC";
import { useNavigate } from "react-router-dom";
import React, {useState, useEffect} from "react";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const url = "https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin/users/";
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState("");
  const [admins, setAdmin] = useState("");
  const [orders, setOrders] = useState("");

  const getAllUsers = async()=>{
    try{
      const res = await axios.get(url,
        {
          headers:{Authorization:`Bearer ${token}`}
        }  
      )
      setUsers(res?.data?.data?.length);
    }catch(err){
      console.log(err?.message);
    }
  }

  const getAdmin = async()=>{
    const url = "https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admin";
    try{
      const res = await axios.get(url,{
        headers:{Authorization:`Bearer ${token}`}
      })
      setAdmin(res?.data?.length);
    }catch(err){
      console.log(err.message);
    }
  }

  const getOrders = async()=>{
    const url = "https://r-ravi-khanna-backend-new-4zmu.vercel.app/api/v1/admins/order";
    try{
      const res = await axios.get(url,
        {
          headers:{Authorization:`Bearer ${token}`}
        }  
      )
      setOrders(res?.data?.length);
    }catch(err){
      console.log(err.message);
    }
  }

  useEffect(()=>{
    getAllUsers();
    getAdmin();
    getOrders();
  },[])

  const card = [
    {
      progress: "bg-green-400",
      title: "Total Users",
      number: users,
      icon: (
        <i
          className="fa-solid fa-user text-2xl"
          style={{ color: "#4099ff" }}
        ></i>
      ),
      bg: "#4099ff",
      link: "/Admin",
    },
    {
      progress: "bg-green-400",
      title: "All Admin",
      number: admins,
      icon: <FiUser className="text-2xl text-[#29cccc]" />,
      bg: "#29cccc",
      link: "/Admin",
    },
    {
      progress: "bg-green-400",
      title: "All Product",
      number: 20,
      icon: <i class="fa-solid fa-cart-shopping text-2xl text-[#3c335d]"></i>,
      bg: "#3c335d",
      link: "/Product",
    },
    {
      progress: "bg-green-400",
      title: "All category",
      number: 10,
      icon: <i className=" fa-brands fa-slack text-2xl text-[#64878e]"></i>,
      bg: "#64878e",
      link: "/Category",
    },

    {
      progress: "bg-green-400",
      title: "All orders",
      number: orders,
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
