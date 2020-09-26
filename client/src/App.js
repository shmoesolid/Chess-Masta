import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";

function App() {

  return (
    <div>
      <Router>
        <button><a href="/home">Home</a></button>
        <Switch>
          <Route path="/home" exact component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
