import Dashboard from "../Components/AdminComponents/Dashboard";
import User from "../Components/AdminComponents/UserComponent/User";
import InfoUser from "../Components/AdminComponents/UserComponent/InfoUser";
import Update from "../Components/AdminComponents/UserComponent/Update";
import AddUser from "../Components/AdminComponents/UserComponent/AddUser";
import Product from "../Components/AdminComponents/ProductComponent/Product";
import InfoProduct from "../Components/AdminComponents/ProductComponent/InfoProduct";
import UpdateProduct from "../Components/AdminComponents/ProductComponent/UpdateProduct";
import Order from "../Components/AdminComponents/OrderComponent/Order";
import OrderInfo from "../Components/AdminComponents/OrderComponent/OrderInfo";

export const adminRouter = [
  { path: "/dashboard", component: Dashboard, layoutClient: null },
  { path: "/users", component: User, layoutClient: null },
  { path: "/users/:id", component: InfoUser, layoutClient: null },
  { path: "/users/update/:id", component: Update, layoutClient: null },
  { path: "/users/add", component: AddUser, layoutClient: null },
  { path: "/products", component: Product, layoutClient: null },
  { path: "/products/:id", component: InfoProduct, layoutClient: null },
  {
    path: "/products/update/:id",
    component: UpdateProduct,
    layoutClient: null,
  },
  { path: "/orders", component: Order, layoutClient: null },
  { path: "/orders/:id", component: OrderInfo, layoutClient: null },
];
