import React from "react";
import "../css/ComponentStyles.css";
import { SidenavData } from "./SidenavData";
import { Link } from "react-router-dom";
import * as FcIcons from "react-icons/fc";

const SideNav = (props) => {
  return (
    <div className="sidenav">
      <br />
      <a href="/">
        <img src="../chessmastalogo.png" alt="logo" id="navLogo" />
      </a>
      <hr />
      <ul className="p-0">
        {SidenavData.map((item, index) => {
          return (
            <div>
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  &nbsp; &nbsp;{item.icon}
                  <span>&nbsp;&nbsp;{item.title}</span>
                </Link>
              </li>
            </div>
          );
        })}
      </ul>
      <div className="docsLink">
        <ul className="p-0">
          <li key={5} className="nav-text docsLink">
            <Link to="/documentation">
              &nbsp; &nbsp;
              <FcIcons.FcViewDetails />
              <span>&nbsp;&nbsp;Documentation</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
