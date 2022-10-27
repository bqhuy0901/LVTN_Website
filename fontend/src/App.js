import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Webfont from "webfontloader";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    Webfont.load({
      families: ["Roboto", "Droid Sans", "Chilanka"],
    });
  });

  return (
    <Router>
      <Header />
      <Footer />
    </Router>
  );
}

export default App;
