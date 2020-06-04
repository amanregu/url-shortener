import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="d-flex flex-row justify-content-between">
        <NavLink to="/">
          <button
            className="btn btn-primary text-dark"
            style={{ cursor: "pointer" }}
          >
            Manage URLs
          </button>
        </NavLink>
        <NavLink to="/categories">
          <button
            className="btn btn-primary text-dark"
            style={{ cursor: "pointer" }}
          >
            Manage Categories
          </button>
        </NavLink>
        <NavLink to="/report">
          <button
            className="btn btn-primary text-dark"
            style={{ cursor: "pointer" }}
          >
            Reports
          </button>
        </NavLink>
      </div>
    </>
  );
};

export default Header;
