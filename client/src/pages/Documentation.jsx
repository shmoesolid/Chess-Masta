import React, { useContext, useEffect } from "react";
//import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../css/ComponentStyles.css";

// import checkLoggedIn from "../utils/checkLoggedIn";
import UserContext from "../context/userContext";

// Components
import Header from "../components/Header";
import SideNav from "../components/SideNav";

// Pages
// import Games from "./Games";
// import Instructions from "./Instructions";
// import AuthOptions from "./AuthOptions";

export default function Documentation() {
  const { userData } = useContext(UserContext);
  // const [userData, setUserData] = useState({
  //   user: undefined,
  // });

  useEffect(() => {

  }, []);

  return (
    <div>
      <Header />
      <div className="row m-0">
        <div className="col-md-3">
          <SideNav />
        </div>
        <div className="col-md-9">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <br />
                <h1>CheSSsk Library</h1>
                <hr />
                <br />
                <h4>Description:</h4>
                <hr />
                <p>
                  A library for chess move validation based on
                  location and board data
                </p>
                <br />
                <h4>Getting Started:</h4>
                <hr />
                <p>
                  To get started open the terminal for your project
                  and run the command below:
                </p>
                <div className="code">
                  <code>&nbsp;npm i chesssk</code>
                </div>
                <br />
                <br />
                <h4>Example Usage:</h4>
                <hr />
                <div className="code">
                  <code>
                    &nbsp;const chesssk = require("chesssk");
                  </code>
                  <br />
                  <code>&nbsp;const game = new chesssk();</code>
                  <br />
                  <code>&nbsp;game.setupNewGame();</code>
                  <br />
                  <code>
                    &nbsp;let validMoves = game.getValidMoves("b1");
                  </code>
                  <br />
                  <code>&nbsp;console.log(validMoves);</code>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  // return (
  //   <div className="App">
  //     <>
  //       <Router>
  //         <Route>
  //           <Switch>
  //             <Route path="/rooms" exact component={Games} />
  //             <Route path="/home" exact component={AuthOptions} />
  //             <Route path="/instructions" exact component={Instructions} />
  //             <UserContext.Provider value={{ userData, setUserData }}>
  //               <Header />
  //               <div className="row m-0">
  //                 <div className="col-md-3">
  //                   <SideNav />
  //                 </div>
  //                 <div className="col-md-9">
  //                   <div className="container">
  //                     <div className="row">
  //                       <div className="col-md-12">
  //                         <br />
  //                         <h1>CheSSsk Library</h1>
  //                         <hr />
  //                         <br />
  //                         <h4>Description:</h4>
  //                         <hr />
  //                         <p>
  //                           A library for chess move validation based on
  //                           location and board data
  //                         </p>
  //                         <br />
  //                         <h4>Getting Started:</h4>
  //                         <hr />
  //                         <p>
  //                           To get started open the terminal for your project
  //                           and run the command below:
  //                         </p>
  //                         <div className="code">
  //                           <code>&nbsp;npm i chesssk</code>
  //                         </div>
  //                         <br />
  //                         <br />
  //                         <h4>Example Usage:</h4>
  //                         <hr />
  //                         <div className="code">
  //                           <code>
  //                             &nbsp;const chesssk = require("chesssk");
  //                           </code>
  //                           <br />
  //                           <code>&nbsp;const game = new chesssk();</code>
  //                           <br />
  //                           <code>&nbsp;game.setupNewGame();</code>
  //                           <br />
  //                           <code>
  //                             &nbsp;let validMoves = game.getValidMoves("b1");
  //                           </code>
  //                           <br />
  //                           <code>&nbsp;console.log(validMoves);</code>
  //                         </div>
  //                         <br />
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             </UserContext.Provider>
  //           </Switch>
  //         </Route>
  //       </Router>
  //     </>
  //   </div>
  // );
}
