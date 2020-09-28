import React from "react";

// Components
import Header from "../components/Header";
import SideNav from "../components/SideNav";

export default function Instructions() {

  return (
    <div>
      <Header />
      <div className="row m-0">
        <div className="col-md-3">
          <SideNav />
        </div>
        <div className="col-md-9">
          <div className="col-md-9">Hello World</div>
        </div>
      </div>
    </div>
  );
}
