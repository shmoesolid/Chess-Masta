import Axios from "axios";

const checkLoggedIn = async () => {

    const tokenRes = await Axios.get("/api/users/tokenIsValid", {
        withCredentials: true,
    });
    if (tokenRes.data) {
        const userRes = await Axios.get("/api/users", {
            withCredentials: true,
        });
        return {
            user: userRes.data,
        };
    }

    return false;
};

export default checkLoggedIn;
