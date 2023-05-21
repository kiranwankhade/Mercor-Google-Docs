import React, { useEffect, useRef, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { CgMenuGridO } from "react-icons/cg";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, logout } from "../firebase";
import Sidebar from "./Sidebar";
import "../Styles/Navbar.css";

const Navbar = () => {
  //getting user from firebase Auth
  const [user, loading] = useAuthState(auth);

  //for logout
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) { return };
    if (!user) { return navigate("/") };
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [user, loading, navigate]); // every user change it get render

  //for sidebar
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleSidebarToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };


  return (
    <div id="navbar">
      {/* navbar left Design */}
      <div id="sidebarHamburger">
        <button ref={sidebarRef} onClick={handleSidebarToggle} className="hamburger" title="Main Menu">
          {isOpen ? <Sidebar isOpen={isOpen} /> : <FiMenu />}
        </button>
        <img
          id="logo"
          src="https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png"
          alt="logo"
        />
        <p>Docs</p>
      </div>

      {/* navbar Search Input */}
      <input
        id="quick_search"
        className="xs-hide"
        name="quick_search"
        placeholder="Search"
        type="search"
      />

      {/* navbar Right Design with data profile */}
      <div id="profileHamburgerButton">

        <button className="hamburger" title="Google Apps">
          <CgMenuGridO />
        </button>

        <button id="profileButton" onClick={handleOpen}><img
          id="profile"
          src={user?.photoURL}
          alt="profile"
        /></button>
        {/* optional chaining in login logout toggle */}
        {open ? (

          <button id="logout" onClick={logout}>Logout</button>

        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
