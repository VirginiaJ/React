import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../../routes";

export default function Meniu() {
  return (
    <nav>
      <ul>
        <li>
          <Link to={routes.home}>Home</Link>
        </li>
        <li>
          <Link to={routes.products}>Product List</Link>
        </li>
      </ul>
    </nav>
  );
}
