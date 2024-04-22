import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Portal from "../AdminComponents/Portal";
import AdminDashImg from "../../Images/admin_dash_img.jpg";

function AdminDashboard() {
  const navigate = useNavigate();
  const selectPageHandler = (page) => {
    navigate(`/management/${page.toLowerCase()}`);
  };

  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <>
      <div className="bg-oatmeal w-full text-red-700 font-bold text-center text-4xl pt-7 pb-2">
        Admin Dashboard
      </div>
      <div className="w-3/4 m-auto font-bold pt-8 pb-3 text-2xl">
        Hi, {username}
      </div>
      <hr className="w-3/4 m-auto pb-4" />
      <div className="flex w-3/4 justify-around m-auto mb-4">
        <Portal onClickHandler={selectPageHandler} />
        <img src={AdminDashImg} alt="AdminDashImg" className="w-1/3" />
      </div>
    </>
  );
}

export default AdminDashboard;
