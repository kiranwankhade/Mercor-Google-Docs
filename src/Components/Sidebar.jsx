import React, { useState } from "react";
import "../Styles/Sidebar.css";
import { Link } from "react-router-dom";

import { IoMdSettings, IoMdHelpCircleOutline } from "react-icons/io";

const Sidebar = ({ isOpen }) => {
  return (
    //sidebar
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div id="sidebarLogo">
        <img
          id="sideLogo"
          src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-sva-scholarship-20.png"
          alt=""
        />{" "}
        <h3>Docs</h3>{" "}
      </div>
      <hr />
      <div className="sidebarDiv">
        <Link className="spanSide" to={"https://mail.google.com"}>
          <div className="linkSide">
            <img
              className="sideApps"
              src="https://assets.stickpng.com/images/62bda0d7bafda8767a088b3e.png"
              alt=""
            />

            <p>Gmail</p>
          </div>
        </Link>

        <Link className="spanSide" to={"https://slides.google.com"}>
          <div className="linkSide">
            <img
              className="sideApps"
              src="https://www.gstatic.com/images/branding/product/1x/slides_2020q4_48dp.png"
              alt=""
            />

            <p>Slides</p>
          </div>
        </Link>

        <Link className="spanSide" to={"https://sheets.google.com"}>
          <div className="linkSide">
            <img
              className="sideApps"
              src=" https://www.gstatic.com/images/branding/product/1x/sheets_2020q4_48dp.png"
              alt=""
            />

            <p>Sheets</p>
          </div>
        </Link>

        <Link className="spanSide" to={"https://chats.google.com"}>
          <div className="linkSide">
            <img
              className="sideApps"
              src="https://mailmeteor.com/logos/assets/PNG/Google_Chat_Logo_256px.png"
              alt=""
            />

            <p>Chats</p>
          </div>
        </Link>
      </div>
      <hr />
      <div className="sidebarDiv">
        <Link className="spanSide">
          <div className="linkSide">
            <IoMdSettings color="grey" fontSize={"35px"} />
            <p style={{ margin: "8px" }}>Settings</p>
          </div>
        </Link>

        <Link className="spanSide">
          <div className="linkSide">
            <IoMdHelpCircleOutline color="grey" fontSize={"35px"} />

            <p style={{ margin: "8px" }}>Help & Feedback</p>
          </div>
        </Link>
      </div>
      <hr />

      <div className="sidebarDiv">
        <Link className="spanSide" to={"https://drive.google.com"}>
          <div className="linkSide">
            <img
              style={{
                width: "30px",
                height: "30px",
                margin: "6px",
              }}
              src="https://mailmeteor.com/logos/assets/PNG/Google_Drive_Logo_256px.png"
              alt=""
            />

            <p>Drive</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
