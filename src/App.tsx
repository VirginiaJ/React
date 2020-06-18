import React from "react";
import "./App.css";
import ProductTable from "./components/product-table/table";
import Home from "./components/home/home";
import Meniu from "./components/meniu/meniu";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { routes } from "./routes";

function App() {
  return (
    <Router>
      <Meniu />
      <Route path={routes.home} exact component={Home} />
      <Route path={routes.products} component={ProductTable} />
    </Router>
  );
}

export default App;
