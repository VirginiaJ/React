import React from "react";
import "./App.css";
import ProductTable from "./components/product-table/table";
import Home from "./components/home/home";
import Meniu from "./components/meniu/meniu";
import Product from "./components/product/product";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { routes } from "./routes";

function App() {
  return (
    <Router>
      <Meniu />
      <Route path={routes.home} exact component={Home} />
      <Route path={routes.products} component={ProductTable} />
      <Route path={routes.product} component={Product} />
    </Router>
  );
}

export default App;
