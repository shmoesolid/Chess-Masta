import { createContext } from "react";

const UserContext = createContext({
    user: undefined, 
    setUserData: () => {}
});
export default UserContext;