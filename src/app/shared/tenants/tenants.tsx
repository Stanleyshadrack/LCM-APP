"use client";

import React, { useState } from "react";
import {
  Table,
  Button,
  Badge,
  Space,
  Modal,
  Select,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "./tenants.css";

import CreateTenantForm from "@/features/tenants/create-tenant-form";
import DeleteTenantModal from "@/app/lcmapplication/protected/modals/delete-tenant/delete-tenant";
import AddTenantButton from "@/app/lcmapplication/protected/widgets/addButton/AddTenantButton";
import SearchInput from "@/app/lcmapplication/protected/widgets/search/SearchInput";

const { Option } = Select;

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
];

const TenantsTable: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "in" | "vacated">("all");
  const [tenantData, setTenantData] = useState<Tenant[]>(initialData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTenant, setCurrentTenant] = useState<TenantFormValues | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [tenantToDelete, setTenantToDelete] = useState<Tenant | null>(null);

  const showModal = (tenant: Tenant | null = null) => {
    if (tenant) {
      setCurrentTenant({
        fullName: tenant.name,
        email: tenant.email,
        idNumber: tenant.idNumber,
        phoneNumber: tenant.phoneNumber,
        apartment: tenant.unit,
        unit: tenant.unit,
        status: tenant.status === "In Residence" ? "inResidence" : "vacated",
      });
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

  const handleDeleteTenant = () => {
    if (tenantToDelete) {
      setTenantData(prev => prev.filter(t => t.key !== tenantToDelete.key));
    }
    setDeleteModalOpen(false);
  };

  const handleSaveTenant = (values: TenantFormValues) => {
    const newTenant: Tenant = {
      key: currentTenant ? currentTenant.idNumber : Date.now().toString(),
      name: values.fullName,
      email: values.email,
      idNumber: values.idNumber,
      phoneNumber: values.phoneNumber,
      unit: values.unit,
      dateCreated: new Date().toLocaleDateString(),
      status: values.status === "inResidence" ? "In Residence" : "Vacated",
    };

    setTenantData(prevData =>
      currentTenant
        ? prevData.map(t => (t.idNumber === currentTenant.idNumber ? newTenant : t))
        : [...prevData, newTenant]
    );
    setIsModalVisible(false);
  };

  const filteredData = tenantData.filter((item) => {
    const searchMatch = item.name.toLowerCase().includes(searchText.toLowerCase());
    const statusMatch =
      statusFilter === "all" ||
      (statusFilter === "in" && item.status === "In Residence") ||
      (statusFilter === "vacated" && item.status === "Vacated");
    return searchMatch && statusMatch;
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      sorter: (a: Tenant, b: Tenant) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      ellipsis: true,
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Date Created",
      dataIndex: "dateCreated",
      key: "dateCreated",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Badge color={status === "In Residence" ? "green" : "orange"} text={status} />
      ),
    },
    {
      title: "Actions",
      key: "action",
      render: (_: any, record: Tenant) => (
        <Space>
          <Button icon={<EditOutlined />} type="link" onClick={() => showModal(record)} />
          <Button icon={<DeleteOutlined />} type="link" danger onClick={() => handleDeleteClick(record)} />
        </Space>
      ),
    },
  ];

  return (
    <div className="tenants-container">
      <div className="page-header">
        <h2>Tenants</h2>
        <div className="filters-inline">
          <SearchInput
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search tenants..."
          />
          <Select
            value={statusFilter}
            onChange={(val) => setStatusFilter(val)}
            style={{ minWidth: 140 }}
          >
            <Option value="all">All</Option>
            <Option value="in">In Residence</Option>
            <Option value="vacated">Vacated</Option>
          </Select>
          <AddTenantButton onClick={() => showModal()} label="+ Add Tenant" />
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
        style={{ maxWidth: "90%" }}
      >
        <CreateTenantForm
          title={currentTenant ? "Edit Tenant" : "Add Tenant"}
          initialValues={currentTenant}
          onCancel={handleCancel}
        />
      </Modal>

    {tenantToDelete && (
  <DeleteTenantModal
    open={deleteModalOpen}
    tenantName={tenantToDelete.name}
    onDelete={handleDeleteTenant}
    onCancel={handleCancel}
    onArchive={() => {
      console.log("Archive logic can go here");
      setDeleteModalOpen(false);
    }}
  />
)}

    </div>
  );
};

export default TenantsTable;
