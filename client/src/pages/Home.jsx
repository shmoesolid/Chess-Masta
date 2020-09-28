import React from "react";
import Nav from "../components/Landing/LandingNav"
import Content from "../components/Landing/Content";
import Footer from "../components/Landing/LandingFooter";

function Home() {
  return (
    <div className="main-container">
      <Nav />
      <Content />
      <Footer />
    </div>
  );
}

export default Home;