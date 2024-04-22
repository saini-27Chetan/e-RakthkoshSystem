import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin({ setLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [dataArr, setDataArr] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch("/api/Admin");
        let data = await response.json();
        setDataArr(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  console.log(dataArr);

  const handleLogin = (e) => {
    e.preventDefault();
    const isValidLogin = dataArr.some(
      (element) =>
        username === element.username && password === element.password
    );

    if (isValidLogin) {
      setLoggedIn(true);
      localStorage.setItem("username", username);
      navigate("/admindashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  const inputStyle = `border-2 border-gray-300 rounded p-2 col-span-2 border-2 border-gray-300 rounded p-2 col-span-2 hover:border-blue-400 hover:shadow-[5px_3px_20px_rgba(3,102,214,0.7)] focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none focus:shadow-none transition-all duration-300`;
  return (
    <>
      <div className="bg-oatmeal w-full text-red-700 font-bold text-center text-4xl pt-7 pb-2">
        Admin Login
      </div>
      <form
        onSubmit={handleLogin}
        className="w-2/5 m-auto my-14 py-6 border-2 border-gray-600 rounded"
      >
        <div className="grid grid-cols-3 w-5/6 py-3 m-auto justify-center items-center">
          <label htmlFor="username" className="text-xl font-bold">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`${inputStyle}`}
          />
        </div>
        <div className="grid grid-cols-3 w-5/6 m-auto py-3 justify-center items-center">
          <label htmlFor="password" className="text-xl font-bold w-1/3">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${inputStyle}`}
          />
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <button
          type="submit"
          className="block w-1/3 m-auto my-4 py-2 cursor-pointer rounded-lg bg-red-600 text-center font-bold text-white hover:bg-red-500 hover:underline text-lg"
        >
          Login
        </button>
      </form>
    </>
  );
}

export default AdminLogin;
