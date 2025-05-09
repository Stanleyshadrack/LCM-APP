import React, { useState } from "react";
import './apartments.css';
import { Button } from "antd";
import ApartmentCard from "../lcmapplication/protected/widgets/ApartmentCard/ApartmentCard";
import AddTenantButton from "../lcmapplication/protected/widgets/addButton/AddTenantButton";
import SearchInput from "../lcmapplication/protected/widgets/search/SearchInput";



type ApartmentStatus = "Letting" | "Under construction";

interface Apartment {
  id: number;
  title: string;
  bedrooms: number;
  bathrooms: number;
  status: ApartmentStatus;
}

const Apartments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const apartmentsPerPage = 8;

  const apartments: Apartment[] = [
    { id: 1, title: "TILES APARTMENT", bedrooms: 2, bathrooms: 1, status: "Letting" },
    { id: 2, title: "TILES APARTMENT", bedrooms: 2, bathrooms: 1, status: "Under construction" },
    { id: 3, title: "TILES APARTMENT", bedrooms: 2, bathrooms: 1, status: "Letting" },
    { id: 4, title: "TILES APARTMENT", bedrooms: 2, bathrooms: 1, status: "Under construction" },
    { id: 5, title: "TILES APARTMENT", bedrooms: 2, bathrooms: 1, status: "Under construction" },
    { id: 6, title: "TILES APARTMENT", bedrooms: 2, bathrooms: 1, status: "Under construction" },
    { id: 7, title: "TILES APARTMENT", bedrooms: 2, bathrooms: 1, status: "Letting" },
    { id: 8, title: "TILES APARTMENT", bedrooms: 2, bathrooms: 1, status: "Letting" },
    { id: 9, title: "TILES APARTMENT", bedrooms: 2, bathrooms: 1, status: "Letting" },
    { id: 10, title: "TILES APARTMENT", bedrooms: 2, bathrooms: 1, status: "Under construction" },
    { id: 11, title: "TILES APARTMENT", bedrooms: 2, bathrooms: 1, status: "Under construction" },
    { id: 12, title: "TILES APARTMENT", bedrooms: 2, bathrooms: 1, status: "Letting" },
    { id: 14, title: "TILES APARTMENT", bedrooms: 2, bathrooms: 1, status: "Letting" },
  ];

  const filteredApartments = apartments.filter((apt) =>
    apt.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredApartments.length / apartmentsPerPage);

  const indexOfLastApartment = currentPage * apartmentsPerPage;
  const indexOfFirstApartment = indexOfLastApartment - apartmentsPerPage;
  const currentApartments = filteredApartments.slice(indexOfFirstApartment, indexOfLastApartment);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="apartments-content">
      <div className="apartments-header">
        <h2>APARTMENTS</h2>
        <div className="header-actions">
        <SearchInput
    value={searchTerm}
    onChange={handleSearchChange}
    placeholder="Search apartments..."
  />
  <AddTenantButton
    onClick={() => {
      
    }}
    label="+ Add Apartment"
  />
        </div>
      </div>

      <div className="apartments-grid">
        {currentApartments.length > 0 ? (
          currentApartments.map(({ id, title, bedrooms, bathrooms, status }) => (
            <ApartmentCard
              key={id}
              title={title}
              bedrooms={bedrooms}
              bathrooms={bathrooms}
              status={status}
            />
          ))
        ) : (
          <div className="no-results">No apartments found.</div>
        )}
      </div>

      <div className="pagination">
        {currentPage > 1 && (
          <Button
            type="link"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </Button>
        )}
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i + 1}
            type={currentPage === i + 1 ? "primary" : "link"}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
        {currentPage < totalPages && (
          <Button
            type="link"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default Apartments;
