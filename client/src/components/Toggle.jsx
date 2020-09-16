import React, { Fragment } from "react";
import "../css/ComponentStyles.css";

const Toggle = (props) => {
    return(
        <Fragment>
            <button className="mt-0 pt-0" id="toggle" onClick={props.click}>&#8801;</button>
        </Fragment>
    )
}

export default Toggle