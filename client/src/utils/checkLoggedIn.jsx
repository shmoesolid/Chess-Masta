import Axios from "axios";

const checkLoggedIn = async () => {
  // let token = localStorage.getItem("auth-token"); // TODO

  // if (token === null) {

  //     localStorage.setItem("auth-token", ""); // TODO

  //     token = "";
  // }
  const tokenRes = await Axios.post("/users/tokenIsValid", null, {
    withCredentials: true,
  });
  if (tokenRes.data) {
    const userRes = await Axios.get("/users", {
      withCredentials: true,
    });
    return {
      // token,
      user: userRes.data,
    };
  }

  return false;
};

export default checkLoggedIn;
