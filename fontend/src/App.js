import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Webfont from "webfontloader";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import { useEffect } from "react";
import LoginSignUp from "./component/User/Login/LoginSignUp";

function App() {
  useEffect(() => {
    Webfont.load({
      families: ["Roboto", "Droid Sans", "Chilanka"],
    });
  }, []);

  return (
    <Router>
      <Header />
      <Route exact path="/login" component={LoginSignUp} />
      <Footer />
    </Router>
  );
}

export default App;
