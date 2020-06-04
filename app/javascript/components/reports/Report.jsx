import React, { useState, useEffect } from "react";
import { NavLink, BrowserRouter as Router } from "react-router-dom";

const Report = () => {

  const [reports, setReports] = useState();

  useEffect(() => {
    fetch(`/api/v1/clicks`, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": document.querySelector('[name="csrf-token"]').content,
      },
    })
      .then((res) => res.json())
      .then((res) => setReports(res.clicks_with_date));
  }, []);

  return (
    <>
      <div className="container">
      <div className="d-flex flex-row justify-content-between" >
              <NavLink to="/">
                <h2 style={{ cursor: 'pointer' }} >Manage URLs</h2>
              </NavLink>
              <NavLink to="/categories">
                <h2 style={{ cursor: 'pointer' }} >Manage Categories</h2>
              </NavLink>
          </div>
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Clicks</th>
            </tr>
          </thead>
          {reports && Object.keys(reports).map((date)=> {
            return (
              <>
                <tbody>
                    <tr>
                    <td>
                      <h4>{date}</h4>
                    </td>
                    <td>
                      <h4>{reports[date].length}</h4>
                    </td>
                  </tr>
                </tbody>
              </>
            )
            console.log(reports[date].length)
          })}
        </table>
      </div>
    </>
  );
};

export default Report;
