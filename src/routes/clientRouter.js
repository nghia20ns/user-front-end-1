import About from "../Components/ClientComponents/About";
import Cart from "../Components/ClientComponents/Cart";
import Home from "../Components/ClientComponents/Home";
import Information from "../Components/ClientComponents/Information";
import Profile from "../Components/ClientComponents/Profile";
import InfoAccount from "../Components/ClientComponents/InfoAccount";

export const clientRouter = [
  { path: "/home", component: Home, layoutAdmin: null },
  { path: "/about", component: About, layoutAdmin: null },
  { path: "/:id/cart/", component: Cart, layoutAdmin: null },
  { path: "/profile", component: Profile, layoutAdmin: null },
  { path: "/:id/information", component: Information, layoutAdmin: null },
  { path: "/profile/:id", component: InfoAccount, layoutAdmin: null },
];
