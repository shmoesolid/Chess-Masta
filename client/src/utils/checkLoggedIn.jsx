import Axios from "axios";

const checkLoggedIn = async () => {

    let token = localStorage.getItem("auth-token"); // TODO

    if (token === null) {

        localStorage.setItem("auth-token", ""); // TODO

        token = "";
    }
    const tokenRes = await Axios.post(
        "/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
    );
    if (tokenRes.data) {
        const userRes = await Axios.get("/users", {
            headers: { "x-auth-token": token },
        });
        return {
            token,
            user: userRes.data,
        };
    }

    return false;
};

export default checkLoggedIn;