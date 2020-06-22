import React from "react";
import { NavLink } from "react-router-dom";
import { routes } from "../../routes";
import styled from "styled-components";

export default function Meniu() {
  return (
    <Navigation>
      <nav>
        <ul>
          <li>
            <NavLink to={routes.home} exact>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={routes.products}>Product List</NavLink>
          </li>
        </ul>
      </nav>
    </Navigation>
  );
}

const Navigation = styled.div`
  background-color: #616161;
  padding: 20px;
  box-shadow: inset 0px 3px 26px 10px rgba(79,79,79,1);
  ul {
    list-style: none;
    margin: 0;
    display: flex;
  }

  ul li a {
    text-decoration: none;
    color: white;
    margin: 10px;
  }

  ul li a:hover,
  ul li a.active {
    color: #bdbdbd;
  }
`;
