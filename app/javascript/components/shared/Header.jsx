import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="d-flex flex-row justify-content-between">
        <NavLink to="/">
          <a
            className="btn btn-primary text-dark"
            style={{ cursor: "pointer" }}
          >
            Manage URLs
          </a>
        </NavLink>
        <NavLink to="/categories">
          <a
            className="btn btn-primary text-dark"
            style={{ cursor: "pointer" }}
          >
            Manage Categories
          </a>
        </NavLink>
        <NavLink to="/report">
          <a
            className="btn btn-primary text-dark"
            style={{ cursor: "pointer" }}
          >
            Reports
          </a>
        </NavLink>
      </div>
    </>
  );
};

export default Header;
