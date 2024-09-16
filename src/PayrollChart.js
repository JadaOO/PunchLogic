import "./PayrollChart.css";
import salaryData from "./salaryCalculatorService";
import Modal from "./modal";
import React, { useState } from "react";

function PayrollChart() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleOpenModal = (item) => {
    setSelectedData(item); // Set the data you want to display
    setIsModalOpen(true); // Open the modal
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedData(null); // Clear the selected data
  };

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
                  <button
                    type="button"
                    class="btn btn-success btn-sm m-1"
                    onClick={() => handleOpenModal(data)}
                  >
                    view details{" "}
                  </button>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </header>
      {isModalOpen && (
        <Modal
          modalIsOpen={isModalOpen}
          data={salaryData}
          onClose={() => handleCloseModal}
        />
      )}
    </div>
  );
}

export default PayrollChart;
