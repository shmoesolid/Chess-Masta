import React, { useState, useEffect, useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "../context/userContext";

import Toggle from "./Toggle";

const Header = () => {
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 933;

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

  return (
    <Navbar className="sticky-top">
      {width > breakpoint ? "" : <Toggle click={openHandler} />}
      <Navbar.Brand href="/"><img src="../chessmastalogo.png" alt="logo" id="navLogo" /></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto welcome">
          <Nav.Item>
            {userData.user ? (
              <p>
                <Link to="/home">{userData.user.displayName}</Link>
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
  );
};

export default Header;
