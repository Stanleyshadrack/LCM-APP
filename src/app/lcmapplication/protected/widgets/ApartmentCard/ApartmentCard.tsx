import React, { useState } from "react";
import { Button, Modal } from "antd";
import "./ApartmentCard.css";
import ApartmentDetails from "../../modals/apartment-details/view-apartment";


interface ApartmentCardProps {
  title: string;
  bedrooms: number;
  bathrooms: number;
  status: "Letting" | "Under construction";
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({
  title,
  bedrooms,
  bathrooms,
  status,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={`apartment-card ${status === "Letting" ? "letting" : "under-construction"}`}>
      <div className="apartment-title">{title}</div>

      <div className="apartment-details">
        <i>{bedrooms} {bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</i>&nbsp;
        <i>{bathrooms} {bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</i>
      </div>

      <div className="apartment-status">
        <span className="status-badge">{status}</span>
      </div>

      
        <Button
          type="link"
          onClick={showModal}
          className="view-details-button"
        >
          View Details
        </Button>
     

      {/* Modal inside ApartmentCard */}
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width="fit-content"
        centered
        destroyOnClose
      >
        <ApartmentDetails />
      </Modal>
    </div>
  );
};

export default ApartmentCard;
