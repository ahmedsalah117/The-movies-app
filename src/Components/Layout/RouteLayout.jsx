import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function RouteLayout({ userData, setUserData }) {
  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("userToken");
    setUserData(null);
    navigate("/login");
  }

  return (
    <>
      <Navbar userData={userData} logOut={logOut}></Navbar>
      <Outlet></Outlet>
      <div className="py-5"></div>
    </>
  );
}

export default RouteLayout;
