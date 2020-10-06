import React from "react";
// import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fc";

export const SidenavData = [
  {
    title: "User Profile",
    path: "/home",
    icon: <FaIcons.FcSettings />,
    cName: "nav-text",
  },
  {
    title: "Games",
    path: "/rooms",
    icon: <FaIcons.FcStart />,
    cName: "nav-text",
  },
  {
    title: "How To Play",
    path: "/instructions",
    icon: <FaIcons.FcQuestions />,
    cName: "nav-text",
  },
  {
    title: "Leaderboards",
    path: "/instructions",
    icon: <FaIcons.FcConferenceCall />,
    cName: "nav-text",
  }
];
