import React, { useState } from "react";
import "./topbar.css";

import * as FaIcons from "react-icons/fa";
import CustomListDropDown from "./DropDownList";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SideBarData";
import { IconContext } from "react-icons";

export default function Topbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <IconContext.Provider value={{ color: "#fff" }}>
            <Link to="#">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
              <ul className="nav-menu-items" onClick={showSidebar}>
                <li className="navbar-toggle">
                  <Link to="#" className="menu-bars">
                    <AiIcons.AiOutlineClose />
                  </Link>
                </li>
                {SidebarData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </IconContext.Provider>
          <Link to={'/'} className="title">
          <span className="title">Server Monitoring System </span></Link>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
              <CustomListDropDown />
          </div>
          <div className="topbarIconContainer"></div>
        </div>
      </div>
    </div>
  );
}

