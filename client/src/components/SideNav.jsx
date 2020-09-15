import React, { useState } from "react";
import "../css/ComponentStyles.css";

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
            <h2>Play</h2>
            <button id="close" onClick={closeHandler}>&times; close</button>
        </div>
    )
}

export default SideNav