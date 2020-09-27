import Games from "./pages/Games";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthOptions from "./pages/AuthOptions";
import Documentation from "./pages/Documentation";
import Home from "./pages/Home";

var routes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/home",
        component: AuthOptions,
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/register",
        component: Register,
    },
    {
        path: "/rooms",
        component: Games,
    },
    {
        path: "/documentation",
        component: Documentation,
    },
]

export default routes;
