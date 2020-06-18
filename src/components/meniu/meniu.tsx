import React from "react";
import { NavLink } from "react-router-dom";
import { routes } from "../../routes";
import "./meniu.css";

export default function Meniu() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to={routes.home} exact>Home</NavLink>
        </li>
        <li>
          <NavLink to={routes.products}>Product List</NavLink>
        </li>
      </ul>
    </nav>
  );
}
