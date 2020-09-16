import React, { useState } from "react";
import "../css/ComponentStyles.css";
import { SidenavData } from './SidenavData';
import { Link } from 'react-router-dom';


const SideNav = (props) => {
    const [sidenavClass, setSidenavClass] = useState(props.sidenav)

    const closeHandler = (e) => {
        e.preventDefault();
        setSidenavClass("sidenav close");
        setTimeout(() => {
            props.close();
        }, 1000)
    }

    return(
        <div className={sidenavClass}>
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
    )
}

export default SideNav