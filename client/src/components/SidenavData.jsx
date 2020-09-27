import React from "react";
// import * as FaIcons from 'react-icons/fa';
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidenavData = [
  {
    title: "User Profile",
    path: "/auth-options",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
  {
    title: "Rooms",
    path: "/rooms",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
  {
    title: "How It Works",
    path: "/how-it-works",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  }
];
