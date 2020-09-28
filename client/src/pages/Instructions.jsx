import React, { useContext, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route
// } from "react-router-dom";

// import checkLoggedIn from "../utils/checkLoggedIn";
import UserContext from "../context/userContext";

// Components
import Header from "../components/Header";
import SideNav from "../components/SideNav";

// Pages
// import Games from "./Games";
// import Documentation from "./Documentation";
// import AuthOptions from "./AuthOptions";


export default function Instructions() {
  // const [userData, setUserData] = useState({
  //   user: undefined,
  // });

  const { userData } = useContext(UserContext);

  useEffect(() => {
    console.log("instructions mount");
    return () => console.log("instructions unmount");
  }, []);

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
  // return (
  //   <div className="App">
  //     <>
  //       <Router>
  //         <Route>
  //           <Switch>
  //             <Route path="/rooms" exact component={Games} />
  //             <Route path="/home" exact component={AuthOptions} />
  //             <Route path="/documentation" exact component={Documentation} />
  //             <UserContext.Provider value={{ userData, setUserData }}>
  //               <Header />
  //               <div className="row m-0">
  //                 <div className="col-md-3">
  //                   <SideNav />
  //                 </div>
  //                 <div className="col-md-9">
  //                   <div className="col-md-9">Hello World</div>
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
