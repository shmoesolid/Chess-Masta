import React, { useState, useEffect, useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "../context/userContext";
import * as FaIcons from "react-icons/fa";

import Toggle from "./Toggle";
import SideNav from "./SideNav";

const Navigation = () => {
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 830;

  const { userData } = useContext(UserContext);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  const openHandler = () => {
    if (!sidenavOpen) {
      setSidenavOpen(true);
    } else {
      setSidenavOpen(false);
    }
  };

  const sidenavCloseHandler = () => {
    setSidenavOpen(false);
  };

  let sidenav;
  if (sidenavOpen) {
    sidenav = <SideNav close={sidenavCloseHandler} sidenav="sidenav" />;
  }

  return (
    <div className="sticky-top">
      <Navbar className="sticky-top">
        {width > breakpoint ? "" : <Toggle className="toggle" click={openHandler} />}
        <Navbar.Brand href="/">
          <img src="../chessmastalogo.png" alt="logo" id="navLogo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto welcome">
            <Nav.Item>
              {userData.user ? (
                <p>
                  <Link to="/home">{userData.user.displayName}&nbsp;{" "}<FaIcons.FaUserCircle color="white" className="img-circle" /></Link>
                </p>
              ) : (
                <p>
                  <Link to="/login">Login</Link>
                </p>
              )}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div>{sidenav}</div>
      {width < breakpoint ? (
        ""
      ) : (
        <SideNav close={sidenavCloseHandler} sidenav="sidenav" />
      )}
    </div>
  );
};

export default Navigation;
