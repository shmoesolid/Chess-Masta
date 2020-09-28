import Axios from "axios";

const checkLoggedIn = async () => {

    console.log("checking login..");

    const tokenRes = await Axios.get("/users/tokenIsValid", {
        withCredentials: true,
    });
    if (tokenRes.data) {
        const userRes = await Axios.get("/users", {
        withCredentials: true,
        });
        return {
            user: userRes.data,
        };
    }

    return false;
};

export default checkLoggedIn;
