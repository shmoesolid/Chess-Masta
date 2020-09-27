import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Nav from "../components/Landing/LandingNav"
import Content from "../components/Landing/Content";
import Footer from "../components/Landing/LandingFooter";

function Home() {
return (
    <div>
      <Router>
        <div class="main-container">
          <Nav />
          <Content />
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default Home;