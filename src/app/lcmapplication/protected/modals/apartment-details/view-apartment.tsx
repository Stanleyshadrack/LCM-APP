"use client";

import React, { useState } from "react";
import "./view-apartment.css";

const ApartmentDetails = () => {
  const units = [
    { unit: "B01", bedroom: "1", status: "Occupied" },
    { unit: "B02", bedroom: "2", status: "Vacated" },
    { unit: "B03", bedroom: "Bedsitter", status: "Occupied" },
    { unit: "C06", bedroom: "Bedsitter", status: "Occupied" },
    
    
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const unitsPerPage = 10;
  const totalPages = Math.ceil(units.length / unitsPerPage);

  const indexOfLastUnit = currentPage * unitsPerPage;
  const indexOfFirstUnit = indexOfLastUnit - unitsPerPage;
  const currentUnits = units.slice(indexOfFirstUnit, indexOfLastUnit);

  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`pagination-btn ${currentPage === i ? "active" : ""}`}
          >
            {i}
          </button>
        );
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(
            <button
              key={i}
              onClick={() => handleClick(i)}
              className={`pagination-btn ${currentPage === i ? "active" : ""}`}
            >
              {i}
            </button>
          );
        }
        pages.push(<span key="dots1" className="dots">...</span>);
        pages.push(
          <button
            key={totalPages}
            onClick={() => handleClick(totalPages)}
            className="pagination-btn"
          >
            {totalPages}
          </button>
        );
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          <button
            key={1}
            onClick={() => handleClick(1)}
            className="pagination-btn"
          >
            1
          </button>
        );
        pages.push(<span key="dots2" className="dots">...</span>);
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(
            <button
              key={i}
              onClick={() => handleClick(i)}
              className={`pagination-btn ${currentPage === i ? "active" : ""}`}
            >
              {i}
            </button>
          );
        }
      } else {
        pages.push(
          <button
            key={1}
            onClick={() => handleClick(1)}
            className="pagination-btn"
          >
            1
          </button>
        );
        pages.push(<span key="dots3" className="dots">...</span>);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(
            <button
              key={i}
              onClick={() => handleClick(i)}
              className={`pagination-btn ${currentPage === i ? "active" : ""}`}
            >
              {i}
            </button>
          );
        }
        pages.push(<span key="dots4" className="dots">...</span>);
        pages.push(
          <button
            key={totalPages}
            onClick={() => handleClick(totalPages)}
            className="pagination-btn"
          >
            {totalPages}
          </button>
        );
      }
    }
    return pages;
  };

  return (
    <div className="apartment-page">
      <div className="container">
        {/* Header */}
        <div className="header">
          <div className="left">
            <h1>APARTMENT DETAILS</h1>
            <h2>LCM APARTMENT</h2>
            <p>1 Bedrooms&nbsp;&nbsp;2 Bedroom&nbsp;&nbsp;Bedsitter</p>
          </div>
          <div className="right">
            <img src="/lcmlogo.svg" alt="Logo" className="lcmlogo" />
            <p className="company-name">Lcm, Inc</p>
            <p>Utawala Mihang'o</p>
            <p>Nairobi, Kenya, IN - 000 000</p>
            <p>TAX ID 00XXXXX1234XXX</p>
          </div>
        </div>

        {/* Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Units</th>
                <th>Bedrooms</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentUnits.map((item, index) => (
                <tr key={index}>
                  <td>{item.unit}</td>
                  <td>{item.bedroom}</td>
                  <td className={item.status.toLowerCase()}>{item.status}</td>
                </tr>
              ))}
              <tr className="total-row">
                <td colSpan={2}><span className="total-text">Total Count</span></td>
                <td className="total-value">{units.length}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination-controls">
          <button
            onClick={() => handleClick(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            Previous
          </button>
          {renderPageNumbers()}
          <button
            onClick={() => handleClick(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
        
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>www.website.com &nbsp;&nbsp;&nbsp; +91 00000 00000 &nbsp;&nbsp;&nbsp; hello@email.com</p>
      </footer>
    </div>
  );
};

export default ApartmentDetails;
