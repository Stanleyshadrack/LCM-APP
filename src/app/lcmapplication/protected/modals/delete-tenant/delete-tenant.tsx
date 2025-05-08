import './delete-tenant.css';
import React from "react";
import { Modal, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

interface DeleteTenantModalProps {
  open: boolean;
  onArchive: () => void;
  onDelete: () => void;
  onCancel: () => void;
  tenantName: string;
}

const DeleteTenantModal: React.FC<DeleteTenantModalProps> = ({
  open,
  onArchive,
  onDelete,
  onCancel,
  tenantName,
}) => {
  return (
<Modal
  title={<div style={{ textAlign: "center" }}>Remove Tenant</div>}
  open={open}
  onCancel={onCancel}
  footer={
    <div className="centered-footer">
      <Button key="cancel" onClick={onCancel}>
        Cancel
      </Button>
      <Button key="archive" onClick={onArchive}>
        Archive
      </Button>
      <Button key="delete" type="primary" danger onClick={onDelete}>
        Delete
      </Button>
    </div>
  }
>

      <div className="modalContent">
        <ExclamationCircleOutlined className="icon" />
        <div className="textContainer">
          <p>
            Are you sure you want to remove <strong>{tenantName}</strong>?
          </p>
          <p>
            You can choose to <strong>archive</strong> this tenant, or{" "}
            <strong>delete permanently</strong>. Archived tenants can be restored later.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteTenantModal;
