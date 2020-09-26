import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Nav from "./components/Landing/LandingNav"
import Content from "./components/Landing/Content";
import Footer from "./components/Landing/LandingFooter";


function App() {

  return (
    <div>
      <Router>
        <div class="main-container">
          <Nav />
          <Content />
          <Footer />
        </div>
        <Switch>
          <Route path="/home" exact component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
