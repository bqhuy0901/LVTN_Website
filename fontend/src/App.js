import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import { useEffect, useState } from "react";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails/ProductDetails";
import Products from "./component/Product/Products/Products";
import Search from "./component/Product/Search/Search";
import LoginSignUp from "./component/User/Login/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile/Profile";
import ProtecteRoute from "./component/Route/ProtecteRoute";
import UpdateProfile from "./component/User/UpdateProfile/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder/ConfirmOrder";
import About from "./component/layout/About/About";
import Contact from "./component/layout/Contact/Contact";
import Payment from "./component/Cart/Payment/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import OrderSuccess from "./component/Cart/OrderSuccess/OrderSuccess";
import MyOrder from "./component/Order/MyOrder/MyOrder";
import OrderDetails from "./component/Order/OrderDetails/OrderDetails";
import Dashboard from "./component/Admin/Dashboard/Dashboard";
import ProductList from "./component/Admin/ProductList/ProductList";
import NewProduct from "./component/Admin/NewProduct/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct/UpdateProduct";
import OrderList from "./component/Admin/OrderList/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder.js/ProcessOrder";
import UserList from "./component/Admin/UserList/UserList";
import UpdateUser from "./component/Admin/UpdateUser/UpdateUser";
import ProductReview from "./component/Admin/ProductReview/ProductReview";
import NotFound from "./component/layout/NotFound/NotFound";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtecteRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/:keyword" component={Products} />
        <Route path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/password/forgot" component={ForgotPassword} />
        <Route exact path="/password/reset/:token" component={ResetPassword} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/login" component={LoginSignUp} />
        <Route exact path="/cart" component={Cart} />

        <ProtecteRoute exact path="/account" component={Profile} />
        <ProtecteRoute exact path="/me/update" component={UpdateProfile} />
        <ProtecteRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />
        <ProtecteRoute exact path="/shipping" component={Shipping} />
        <ProtecteRoute exact path="/success" component={OrderSuccess} />
        <ProtecteRoute exact path="/orders" component={MyOrder} />
        <ProtecteRoute exact path="/order/confirm" component={ConfirmOrder} />
        <ProtecteRoute exact path="/order/:id" component={OrderDetails} />

        <ProtecteRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />

        <ProtecteRoute
          isAdmin={true}
          exact
          path="/admin/products"
          component={ProductList}
        />

        <ProtecteRoute
          isAdmin={true}
          exact
          path="/admin/product"
          component={NewProduct}
        />

        <ProtecteRoute
          isAdmin={true}
          exact
          path="/admin/product/:id"
          component={UpdateProduct}
        />

        <ProtecteRoute
          isAdmin={true}
          exact
          path="/admin/orders"
          component={OrderList}
        />

        <ProtecteRoute
          isAdmin={true}
          exact
          path="/admin/order/:id"
          component={ProcessOrder}
        />

        <ProtecteRoute
          isAdmin={true}
          exact
          path="/admin/users"
          component={UserList}
        />

        <ProtecteRoute
          isAdmin={true}
          exact
          path="/admin/user/:id"
          component={UpdateUser}
        />

        <ProtecteRoute
          isAdmin={true}
          exact
          path="/admin/reviews"
          component={ProductReview}
        />

        <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
