import React, { useState } from "react";
import "../css/ComponentStyles.css";

const SideNav = (props) => {
    const [sidenavClass, setSidenavClass] = useState(props.sidenav)
    
    const closeHandler = (e) => {
        e.preventDefault();
        setSidenavClass("sidenav close");
        props.close();
    }

    return(
        <div className={sidenavClass}>
            <h2>Sidebar</h2>
            <button id="close" onClick={closeHandler}>&times; close</button>
        </div>
    )
}

export default SideNav