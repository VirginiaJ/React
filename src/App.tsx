import React from "react";
import "./App.css";
import TestTable from "./components/myTable/table";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { routes } from "./routes";
import Home from "./components/home/home";
import Meniu from "./components/meniu/meniu";

function App() {
  return (
    <Router>
      <Meniu />
      <Route path={routes.home} exact component={Home} />
      <Route path={routes.products} component={TestTable} />
    </Router>
  );
}

export default App;
