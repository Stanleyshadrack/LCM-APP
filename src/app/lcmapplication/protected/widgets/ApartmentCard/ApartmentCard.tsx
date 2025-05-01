import React, { useState } from "react";
import { Button, Modal } from "antd";
import "./ApartmentCard.css";
import ApartmentDetails from "../../modals/apartment-details/view-apartment";

type ApartmentStatus = "Letting" | "Under construction";

interface ApartmentCardProps {
  title: string;
  bedrooms: number;
  bathrooms: number;
  status: ApartmentStatus;
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
    <div
      className={`apartment-card ${
        status === "Letting" ? "letting" : "under-construction"
      }`}
    >
      <h3 className="apartment-title">{title}</h3>

      <div className="apartment-details">
        <i>
          {bedrooms} {bedrooms === 1 ? "Bedroom" : "Bedrooms"}
        </i>
        &nbsp;
        <i>
          {bathrooms} {bathrooms === 1 ? "Bathroom" : "Bathrooms"}
        </i>
      </div>

      <div className="apartment-status">
        <span className="status-badge">{status}</span>
      </div>

      <Button
        type="link"
        onClick={showModal}
        className="view-details-button"
        aria-label={`View details for ${title}`}
      >
        View Details
      </Button>

      {/* Conditionally render modal to avoid unnecessary DOM load */}
      {isModalVisible && (
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
      )}
    </div>
  );
};

export default ApartmentCard;
