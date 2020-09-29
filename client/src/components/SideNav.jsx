import React from "react";
import "../css/ComponentStyles.css";
import { SidenavData } from "./SidenavData";
import { Link } from "react-router-dom";
import * as IoIcons from "react-icons/io";

const SideNav = (props) => {
  return (
    <div className="sidenav">
      <ul className="p-0">
        {SidenavData.map((item, index) => {
          return (
            <li key={index} className={item.cName}>
              <Link to={item.path}>
                {item.icon}
                <span>&nbsp;&nbsp;{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="docsLink">
        <ul className="p-0">
          <li key={5} className="nav-text docsLink">
            <Link to="/documentation">
              <IoIcons.IoIosPaper />
              <span>&nbsp;&nbsp;Documentation</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
