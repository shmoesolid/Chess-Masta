import React, { useEffect, useContext } from "react";
import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  useHistory,
} from "react-router-dom";
import Axios from "axios";

//import checkLoggedIn from "../utils/checkLoggedIn";
import UserContext from "../context/userContext";

// Components
import Header from "../components/Header";
import SideNav from "../components/SideNav";

// Pages
// import Games from "./Games";
// import Instructions from "./Instructions";
// import Documentation from "./Documentation";
// import Login from "./Login";
// import Register from "./Register";

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);
  // const [userData, setUserData] = useState({
  //   user: undefined,
  // });
  const history = useHistory();

  useEffect(() => {
    
  }, []);

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const logout = () => {
    Axios.get("/users/logout", { withCredentials: true });
    setUserData({
      user: undefined
    });
    history.push("/");
    // cookie.remove("token");
  };
  const deleteUser = () => {
    Axios.delete("/users/delete", { withCredentials: true });
    setUserData({
      user: undefined,
    });
    history.push("/login");
  };

  return (
    <div>
        <Header />
        <div className="row m-0">
          <div className="col-md-3">
            <SideNav />
          </div>
          <div className="col-md-9">
            <div className="auth-options">
              {userData.user ? (
                <>
                  <br />
                  <h5>Account Options</h5>
                  <hr />
                  <div className="row">
                    <div className="acctOps">
                      <div id="logout" onClick={logout}>
                        Log out
                      </div>
                      <br />
                      <div id="delete" onClick={deleteUser}>
                        Delete Account
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <br />
                  <h5>
                    Log in or Register a New Account to Start Playing
                  </h5>
                  <hr />
                  <div className="row">
                    <div onClick={register} className="col-md-5 card text-center card-1">
                      <p>Register</p>
                    </div>
                    <div onClick={login} className="col-md-5 card text-center card-1">
                        <p>Log in</p>
                    </div>
                  </div>
                </>
              )}
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
  //             <Route path="/instructions" exact component={Instructions} />
  //             <Route path="/documentation" exact component={Documentation} />
  //             <Route path="/login" exact component={Login} />
  //             <Route path="/register" exact component={Register} />
  //             <UserContext.Provider value={{ userData, setUserData }}>
  //               <Header />
  //               <div className="row m-0">
  //                 <div className="col-md-3">
  //                   <SideNav />
  //                 </div>
  //                 <div className="col-md-9">
  //                   <div className="auth-options">
  //                     {userData.user ? (
  //                       <>
  //                         <br />
  //                         <h5>Account Options</h5>
  //                         <hr />
  //                         <div className="row">
  //                           <div className="acctOps">
  //                             <div id="logout" onClick={logout}>
  //                               Log out
  //                             </div>
  //                             <br />
  //                             <div id="delete" onClick={deleteUser}>
  //                               Delete Account
  //                             </div>
  //                           </div>
  //                         </div>
  //                       </>
  //                     ) : (
  //                       <>
  //                         <br />
  //                         <h5>
  //                           Log in or Register a New Account to Start Playing
  //                         </h5>
  //                         <hr />
  //                         <div className="row">
  //                           <div onClick={register} className="col-md-5 card text-center card-1">
  //                             <p>Register</p>
  //                           </div>
  //                           <div onClick={login} className="col-md-5 card text-center card-1">
  //                               <p>Log in</p>
  //                           </div>
  //                         </div>
  //                       </>
  //                     )}
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
