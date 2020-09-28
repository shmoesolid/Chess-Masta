import React, { useState, useEffect } from "react";
import { Nav, Navbar } from "react-bootstrap";
import checkLoggedIn from "../utils/checkLoggedIn";
import { Link } from "react-router-dom";

import Toggle from "./Toggle";

const Header = () => {
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 933;
  // user auth
  const [userData, setUserData] = useState({
    user: undefined,
  });

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));

    async function check() {
      var login = await checkLoggedIn();
      if (login !== false) setUserData(login);
    }

    check();
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
      <Navbar.Brand href="/">Chess Masta Logo</Navbar.Brand>
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
