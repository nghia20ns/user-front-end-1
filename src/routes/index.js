import Signup from "../Components/Signup";
import Login from "../Components/Login";
import { adminRouter } from "./adminRouter";
import { clientRouter } from "./clientRouter";

import ErrorPage from "../Components/ErrorPage";

const indexRouter = [
  {
    path: "/error",
    component: ErrorPage,
    layoutAdmin: null,
    layoutClient: null,
  },
  { path: "/", component: Login, layoutAdmin: null, layoutClient: null },
  { path: "/signup", component: Signup, layoutAdmin: null, layoutClient: null },
];

const publicRoutes = indexRouter.concat(adminRouter).concat(clientRouter);

const privateRoutes = {};
export { publicRoutes, privateRoutes };
