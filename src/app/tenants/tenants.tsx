import React, { useState } from "react";
import { Table, Button, Badge, Input, Space, Modal } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "./tenants.css";
import CreateTenantForm from "../lcmapplication/forms/add-tenants/add-tenant";
import DeleteTenantModal from "../lcmapplication/protected/modals/delete-tenant/delete-tenant";

interface Tenant {
  key: string;
  name: string;
  email: string;
  idNumber: string;
  phoneNumber: string;
  unit: string;
  dateCreated: string;
  status: "In Residence" | "Vacated";
}

interface TenantFormValues {
  fullName: string;
  email: string;
  idNumber: string;
  phoneNumber: string;
  apartment: string;
  unit: string;
  status: "inResidence" | "vacated";
}

const initialData: Tenant[] = [
  { key: "1", name: "John Doe", email: "johndoe@gmail.com", idNumber: "12345678", phoneNumber: "254742792965", unit: "B02", dateCreated: "02/04/2024", status: "In Residence" },
  { key: "2", name: "Jane Smith", email: "janesmith@gmail.com", idNumber: "87654321", phoneNumber: "254700123456", unit: "C01", dateCreated: "03/04/2024", status: "Vacated" },
  { key: "3", name: "Jake Park", email: "jakepark@gmail.com", idNumber: "11223344", phoneNumber: "254711223344", unit: "D01", dateCreated: "04/04/2024", status: "Vacated" },
  { key: "4", name: "Amelia Brown", email: "ameliabrown@gmail.com", idNumber: "99887766", phoneNumber: "254722998877", unit: "A03", dateCreated: "05/04/2024", status: "In Residence" },
  { key: "5", name: "Chris Evans", email: "chrisevans@gmail.com", idNumber: "55667788", phoneNumber: "254733556677", unit: "E02", dateCreated: "06/04/2024", status: "Vacated" },
];

const TenantsTable: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [tenantData, setTenantData] = useState<Tenant[]>(initialData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTenant, setCurrentTenant] = useState<TenantFormValues | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [tenantToDelete, setTenantToDelete] = useState<Tenant | null>(null);

  const showModal = (tenant: Tenant | null = null) => {
    if (tenant) {
      const mappedTenant: TenantFormValues = {
        fullName: tenant.name,
        email: tenant.email,
        idNumber: tenant.idNumber,
        phoneNumber: tenant.phoneNumber,
        apartment: tenant.unit,
        unit: tenant.unit,
        status: tenant.status === "In Residence" ? "inResidence" : "vacated",
      };
      setCurrentTenant(mappedTenant);
    } else {
      setCurrentTenant(null);
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => setIsModalVisible(false);

  const handleDeleteClick = (tenant: Tenant) => {
    setTenantToDelete(tenant);
    setDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setTenantToDelete(null);
  };

  const handleArchiveTenant = () => {
    console.log(`Archived ${tenantToDelete?.name}`);
    handleCancelDelete();
  };

  const handleDeleteTenant = () => {
    if (tenantToDelete) {
      setTenantData(prev => prev.filter(t => t.key !== tenantToDelete.key));
      console.log(`Deleted ${tenantToDelete.name}`);
    }
    handleCancelDelete();
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "ID Number", dataIndex: "idNumber", key: "idNumber" },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Unit", dataIndex: "unit", key: "unit" },
    { title: "Date Created", dataIndex: "dateCreated", key: "dateCreated" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: Tenant["status"]) => (
        <Badge color={status === "In Residence" ? "green" : "orange"} text={status} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Tenant) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} type="link" onClick={() => showModal(record)} />
          <Button icon={<DeleteOutlined />} type="link" danger onClick={() => handleDeleteClick(record)} />
        </Space>
      ),
    },
  ];

  const filteredData = tenantData.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="tenants-container">
      <div className="page-header">
        <h2>Tenants</h2>
        <div className="page-actions">
          <Input
            placeholder="Search by name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="search-input"
            style={{ width: 250 }}
          />
          <Button type="primary" className="add-tenant-button" onClick={() => showModal()}>
            + Add Tenant
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 8 }}
        bordered
        rowClassName={() => "custom-table-row"}
      />

      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
        width="fit-content"
        style={{
          maxWidth: "90%",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CreateTenantForm
          title={currentTenant ? "Edit Tenant" : "Add Tenant"}
          initialValues={currentTenant}
           onCancel={handleCancel }        />
      </Modal>

      {tenantToDelete && (
        <DeleteTenantModal
          open={deleteModalOpen}
          tenantName={tenantToDelete.name}
          onArchive={handleArchiveTenant}
          onDelete={handleDeleteTenant}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default TenantsTable;
