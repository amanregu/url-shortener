import React, { useState, useEffect } from "react";

import Header from '../shared/Header'

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
        <div className="row" >
            <div className="col" >
              <h1 >Monthly Visits</h1>
            </div>
            <div className="col-5">
              <Header/>
            </div>
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
