import React from "react";
import "../css/ComponentStyles.css";
import { SidenavData } from "./SidenavData";
import { Link } from "react-router-dom";

const SideNav = (props) => {
return (
    <div>
      <ul>
        {SidenavData.map((item, index) => {
          return (
            <li key={index} className={item.cName}>
              <Link to={item.path}>
                {item.icon}
                <span>&nbsp;{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideNav;
