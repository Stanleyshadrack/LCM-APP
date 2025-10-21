import React, { useState } from "react";
import { Tag, Upload, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import { ApartmentStatus, ApartmentUnits } from "@/app/lcmapplication/types/invoice";
import "./ApartmentCard.css";

interface ApartmentCardProps {
  title: string;
  units: string[];
  status: ApartmentStatus;
  address: string;
  isList?: boolean;
  actions?: React.ReactNode;
  imageUrl?: string; // ✅ new optional prop for preset image
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
  units,
  status,
  address,
  isList = false,
  actions,
  imageUrl,
}) => {
  // Local state for uploaded image
  const [fileList, setFileList] = useState<UploadFile[]>(
    imageUrl
      ? [{ uid: "-1", name: "apartment.png", status: "done", url: imageUrl }]
      : []
  );

  const handleChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
    setFileList(newFileList);
  };

  
  const unitIdsTooltip = units.join(", ");
  const remainingCount = units.length - 2;


  return (
    <div className={`apartment-card ${statusColorMap[status]} ${isList ? "list-view" : ""}`}>
      <div className="card-header">
        <h3 className="apartment-title">{title}</h3>
        {isList && (
          <Tag color={statusTagColor[status]} className="status-badge">
            {status}
          </Tag>
        )}
      </div>

      <div className="apartment-details">
        <span title={unitIdsTooltip}>
          {unitIdsTooltip}
          {remainingCount > 0 && ` ...`}
        </span>

        {/* ✅ Replace unit count with Upload */}
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={handleChange}
          beforeUpload={() => false} // prevent auto upload
          maxCount={1}
        >
          {fileList.length >= 1 ? null : (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
      </div>

      <div className="card-footer">
        {!isList && (
          <Tag color={statusTagColor[status]} className="status-badge">
            {status}
          </Tag>
        )}
        {actions}
      </div>
    </div>
  );
};

export default ApartmentCard;
