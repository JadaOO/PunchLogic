import React, { useEffect, useState } from "react";
import "./PayrollChart.css";
import salaryData from "./salaryCalculatorService";

function PayrollChart() {
  return (
    <div className="container" data-testid="container">
      <header className="card p-5">
        <h3>Salary Details</h3>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Employee</th>
              <th scope="col">Regular Hours</th>
              <th scope="col">Overtime Hours</th>
              <th scope="col">Doubletime Hours</th>

              <th>Total Salary</th>
              <th>Total Benefit</th>
            </tr>
          </thead>
          <tbody>
            {!salaryData ? (
              <div>Loading..., working really hard here! </div>
            ) : (
              salaryData.map((data, index) => (
                <tr key={index}>
                  <td scope="row">{data.employee}</td>
                  <td>{data.regularHours}</td>
                  <td>{data.overtimeHours}</td>
                  <td>${data.doubletimeHours}</td>
                  <td>{data.totalAmount}</td>
                  <td>{data.totalBenefits}</td>
                  <button type="button" class="btn btn-success btn-sm m-1">
                    view details{" "}
                  </button>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default PayrollChart;
