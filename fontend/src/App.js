import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Webfont from "webfontloader";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import { useEffect } from "react";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails"
function App() {
  useEffect(() => {
    Webfont.load({
      families: ["Roboto", "Droid Sans", "Chilanka"],
    });
  }, []);

  return (
    <Router>
      <Header />
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails}/>
      <Footer />
    </Router>
  );
}

export default App;
