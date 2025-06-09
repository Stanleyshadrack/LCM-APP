import React, { useState } from "react";
import { Button, Modal, Tooltip, Tag } from "antd";
import ApartmentDetails from "../../modals/apartment-details/view-apartment";
import { ApartmentStatus } from "@/app/lcmapplication/types/invoice";
import "./ApartmentCard.css";

interface ApartmentCardProps {
  title: string;
  unitTypes: string[];
  status: ApartmentStatus;
  address: string;
}

const statusColorMap: Record<ApartmentStatus, string> = {
  "Letting": "letting",
  "Under construction": "under-construction",
  "Sold out": "sold-out",
};

const statusTagColor: Record<ApartmentStatus, string> = {
  "Letting": "blue",
  "Under construction": "green",
  "Sold out": "red",
};

const ApartmentCard: React.FC<ApartmentCardProps> = ({
  title,
  unitTypes,
  status,
  address,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const visibleTypes = unitTypes.slice(0, 2).join(", ");
  const remainingCount = unitTypes.length - 2;

  return (
    <>
      <div className={`apartment-card ${statusColorMap[status]}`}>
        <div className="card-header">
          <h3 className="apartment-title">{title}</h3>
        </div>

        <div className="apartment-details">
          <Tooltip
            title={unitTypes.length > 2 ? unitTypes.join(", ") : undefined}
            placement="topLeft"
          >
            <span>
              {visibleTypes}
              {remainingCount > 0 && ` ...`}
            </span>
          </Tooltip>
          <span className="unit-count-badge">{unitTypes.length} Units</span>
        </div>

        <div className="card-footer">
          <Button
            type="link"
            onClick={() => setIsModalVisible(true)}
            className="view-details-button"
            aria-label={`View details for ${title}`}
          >
            View Details
          </Button>

          <Tag color={statusTagColor[status]} className="status-badge">
            {status}
          </Tag>
        </div>
      </div>

      <Modal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width="fit-content"
        centered
        destroyOnClose
        closeIcon={null}
      >
        <ApartmentDetails
          apartmentName={title}
          unitTypes={unitTypes}
          address={address}
        />
      </Modal>
    </>
  );
};

export default ApartmentCard;
