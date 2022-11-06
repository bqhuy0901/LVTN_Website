import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import { useEffect, useState } from "react";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
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
import axios from "axios";
import Payment from "./component/Cart/Payment/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// import Dashboard from "./component/Admin/Dashboard/Dashboard";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);

    getStripeApiKey();
  }

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Route exact path="/" component={Home} />
      <Route exact path="/products" component={Products} />
      <Route path="/products/:keyword" component={Products} />

      <Route exact path="/search" component={Search} />

      <ProtecteRoute exact path="/account" component={Profile} />
      <ProtecteRoute exact path="/me/update" component={UpdateProfile} />
      <ProtecteRoute exact path="/password/update" component={UpdatePassword} />

      <Route exact path="/password/forgot" component={ForgotPassword} />
      <Route exact path="/password/reset/:token" component={ResetPassword} />

      <Route exact path="/product/:id" component={ProductDetails} />

      <Route exact path="/login" component={LoginSignUp} />

      <Route exact path="/cart" component={Cart} />
      <ProtecteRoute exact path="/shipping" component={Shipping} />
      <ProtecteRoute exact path="/order/confirm" component={ConfirmOrder} />

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtecteRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}

      {/* <ProtecteRoute exact path="/admin/dashboard" component={Dashboard} /> */}

      <Footer />
    </Router>
  );
}

export default App;
