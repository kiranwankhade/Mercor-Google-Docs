import React, { useEffect, useRef, useState } from "react";

import "../Styles/Navbar.css";

import { FiMenu } from "react-icons/fi";
import { CgMenuGridO } from "react-icons/cg";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db,logout } from "../firebase";
import Sidebar from "./Sidebar";

const Navbar = () => {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");

    //for logout
    const [open, setOpen] = React.useState(false);

   const handleOpen = () => {
     setOpen(!open);
  };
    const navigate = useNavigate();

    //get user details
    const fetchUserProfile = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);
      } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
      }
    };

    useEffect(() => {
      if (loading){ return};
      if (!user) {return navigate("/")};
      fetchUserProfile();
      document.addEventListener('mousedown', handleOutsideClick);

      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }, [user, loading]);
    console.log('user:', user)

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
        <div id="sidebarHamburger">
            <button  ref={sidebarRef}  onClick={handleSidebarToggle} className="hamburger" title="Main Menu">
            {isOpen ? <Sidebar isOpen={isOpen}/> : <FiMenu /> }
            </button>
            <img
                id="logo"
                src="https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png"
                alt="logo"
            />
            <p>Docs</p>
      </div>
     
        <input
          id="quick_search"
          className="xs-hide"
          name="quick_search"
          placeholder="Search"
          type="search"
        />

        <div id="profileHamburgerButton">

        <button className="hamburger" title="Google Apps">
          <CgMenuGridO />
        </button>

        <button id="profileButton" onClick={handleOpen}><img
          id="profile"
          src={user?.photoURL}
          alt="profile"
        /></button>
        {open ? (
        
          <button id="logout" onClick={logout}>Logout</button>
        
      ) : null}
      </div>
    </div>
  );
};

export default Navbar;
