import React, { useState, useEffect } from "react";
import "../css/ComponentStyles.css";
import { SidenavData } from "./SidenavData";
import { Link } from "react-router-dom";
import * as IoIcons from "react-icons/io";

const SideNav = (props) => {
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 933;

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  const sidenavCloseHandler = () => {
    setSidenavOpen(false);
  };

  let sidenav;
  if (sidenavOpen) {
    sidenav = <SideNav close={sidenavCloseHandler} sidenav="sidenav" />;
  }

  return (
    <div>
      {width < breakpoint ? (
        ""
      ) : (
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
      )}
      <div>{sidenav}</div>
    </div>
  );
};

export default SideNav;
