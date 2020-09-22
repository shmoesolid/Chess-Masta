import React from "react";
// import * as FaIcons from 'react-icons/fa';
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidenavData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Create Game",
    path: "/create",
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
    title: "User Profile",
    path: "/auth-options",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
  {
    title: "Docs",
    path: "/documentation",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
];
