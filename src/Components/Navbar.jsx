import React, { useEffect, useState } from "react";

import "../Styles/Navbar.css";

import { FiMenu } from "react-icons/fi";
import { CgMenuGridO } from "react-icons/cg";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";

const Navbar = () => {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const fetchUserName = async () => {
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
      if (loading) return;
      if (!user) return navigate("/");
      fetchUserName();
    }, [user, loading]);
    console.log('user:', user)
  return (
    <div id="navbar">
        <div id="sidebarHamburger">
            <button className="hamburger" title="Main Menu">
                <FiMenu />
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

        <div id="profileButton">

      <button className="hamburger" title="Google Apps">
        <CgMenuGridO />
      </button>

      <img
        id="profile"
        src={user?.photoURL}
        alt="profile"
      />
      </div>
    </div>
  );
};

export default Navbar;
