import React, { useState } from "react";
import "./apartments.css";
import { Button, Modal } from "antd";
import ApartmentCard from "../lcmapplication/protected/widgets/ApartmentCard/ApartmentCard";
import AddTenantButton from "../lcmapplication/protected/widgets/addButton/AddTenantButton";
import SearchInput from "../lcmapplication/protected/widgets/search/SearchInput";
import CreateApartmentForm from "../lcmapplication/forms/add-apartment/createApartmentForm";
import { Apartment, ApartmentStatus } from "../lcmapplication/types/invoice";




const Apartments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apartments, setApartments] = useState<Apartment[]>([]);

  const apartmentsPerPage = 8;

 const handleAddApartment = (data: {
  name: string;
  unitType: string[];
  status: ApartmentStatus;
  location: string;
  waterUnitCost: number;
}) => {
  const newApartment: Apartment = {
    id: apartments.length + 1,
    title: data.name,
    unitTypes: data.unitType,
    status: data.status,
  
  };
  setApartments((prev) => [...prev, newApartment]);
  setIsModalOpen(false);
};


  const filteredApartments = apartments.filter((apt) =>
    apt.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredApartments.length / apartmentsPerPage);
  const indexOfLastApartment = currentPage * apartmentsPerPage;
  const indexOfFirstApartment = indexOfLastApartment - apartmentsPerPage;
  const currentApartments = filteredApartments.slice(indexOfFirstApartment, indexOfLastApartment);

  return (
    <div className="apartments-content">
      <div className="apartments-header">
        <h2>APARTMENTS</h2>
        <div className="header-actions">
          <SearchInput
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search apartments..."
          />
          <AddTenantButton onClick={() => setIsModalOpen(true)} label="+ Add Apartment" />
        </div>
      </div>

      <div className="apartments-grid">
 {currentApartments.map(({ id, title, unitTypes, status }) => (
  <ApartmentCard
     key={id}
     title={title}
     unitTypes={unitTypes}
     status={status} 
     address={""}  />
))}

      </div>

      <div className="pagination">
        {currentPage > 1 && (
          <Button type="link" onClick={() => setCurrentPage(currentPage - 1)}>
            Previous
          </Button>
        )}
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i + 1}
            type={currentPage === i + 1 ? "primary" : "link"}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
        {currentPage < totalPages && (
          <Button type="link" onClick={() => setCurrentPage(currentPage + 1)}>
            Next
          </Button>
        )}
      </div>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <CreateApartmentForm onSubmit={handleAddApartment} />
      </Modal>
    </div>
  );
};

export default Apartments;
