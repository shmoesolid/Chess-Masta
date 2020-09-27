import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Nav from "./components/Landing/LandingNav"
import Content from "./components/Landing/Content";
import Footer from "./components/Landing/LandingFooter";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
