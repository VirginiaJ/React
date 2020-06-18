import React from "react";
import "./App.css";
import TestTable from "./components/myTable/table";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <TestTable />
    </Router>
  );
}

export default App;
