import { React, useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./Components/NavigationComponent/Navbar";
import Home from "./Components/Pages/Home";
import About from "./Components/Pages/About";
import AdminDashboard from "./Components/Pages/AdminDashboard";
import Footer from "./Components/Footer";
import Search from "./Components/Pages/Search";
import Request from "./Components/Pages/Request";
import ManagementPage from "./Components/AdminComponents/ManagementPage";
import AdminLogin from "./Components/AdminComponents/AdminLogin";
import AddNew from "./Components/AdminComponents/AddNew";
import UpdateFormPage from "./Components/AdminComponents/UpdateFormPage";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const [navLinks, setNavLinks] = useState([
    { to: "/", text: "Home" },
    { to: "/about", text: "About Us" },
    { to: "/search", text: "Search" },
    { to: "/request", text: "Request" },
    { to: "/admin/login", text: "Admin Login" },
  ]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (page === "/" || page === "/about") {
      setNavLinks([
        { to: "/", text: "Home" },
        { to: "/about", text: "About Us" },
        { to: "/search", text: "Search" },
        { to: "/request", text: "Request" },
        { to: "/admin/login", text: "Admin Login" },
      ]);
    }
    if (page === "/admindashboard") {
      setNavLinks([
        { to: "/admindashboard", text: "Dashboard" },
        { to: "/add-new", text: "Add New" },
        { to: "/admindashboard", text: "Logout" },
      ]);
    }
  };

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === true
  );
  useEffect(() => {
    localStorage.setItem("loggedIn", loggedIn);
  }, [loggedIn]);

  return (
    <div className="m-0 p-0">
      <Navbar
        currentPage={currentPage}
        onPageChange={handlePageChange}
        navLinks={navLinks}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/search/:pageText" element={<Search />} />
        <Route path="/request/:pageText" element={<Request />} />
        <Route
          path="/management/:pageText"
          element={
            loggedIn ? <ManagementPage /> : <Navigate to="/admin/login" />
          }
        />
        <Route
          path="/add-new/:pageText"
          element={loggedIn ? <AddNew /> : <Navigate to="/admin/login" />}
        />
        <Route
          path="/admindashboard"
          element={
            loggedIn ? <AdminDashboard /> : <Navigate to="/admin/login" />
          }
        />
        <Route
          path="/admin/login"
          element={<AdminLogin setLoggedIn={setLoggedIn} />}
        />
        <Route
          path="/update/:pageText"
          element={
            loggedIn ? <UpdateFormPage /> : <Navigate to="/admin/login" />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
