import React from "react";
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";

export const SidenavData = [
  {
    title: "User Profile",
    path: "/home",
    icon: <FaIcons.FaUserCircle />,
    cName: "nav-text",
  },
  {
    title: "Rooms",
    path: "/rooms",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
  {
    title: "How To Play",
    path: "/instructions",
    icon: <FaIcons.FaQuestionCircle />,
    cName: "nav-text",
  }
];
