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
import {
  DeleteOutlined,
  EditOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";

import CreateTenantForm from "@/features/tenants/create-tenant-form";
import DeleteTenantModal from "@/app/lcmapplication/protected/modals/delete-tenant/delete-tenant";
import AddTenantButton from "@/app/lcmapplication/protected/widgets/addButton/AddTenantButton";
import SearchInput from "@/app/lcmapplication/protected/widgets/search/SearchInput";
import { Apartmentos } from "@/app/lcmapplication/types/invoice";

import "./tenants.css";

const { Option } = Select;

/* -------------------- Types -------------------- */
interface Tenant {
  key: string;
  name: string;
  email: string;
  idNumber: string;
  phoneNumber: string;
  apartment: string;
  unit: string;
  dateCreated: string;
  status: "In Residence" | "Vacated";
  tenancyAgreement?: string;
  dateVacated?: string;
}

interface TenantFormValues {
  fullName: string;
  email: string;
  idNumber: string;
  phoneNumber: string;
  apartment: string;
  unit: string;
  status: "inResidence" | "vacated";
  tenancyAgreement?: string;
  dateVacated?: string;
}

/* -------------------- Initial Data -------------------- */
const initialData: Tenant[] = [
  {
    key: "1",
    name: "John Doe",
    email: "johndoe@gmail.com",
    idNumber: "12345678",
    phoneNumber: "254742792965",
    apartment: "Block B",
    unit: "B02",
    dateCreated: "02/04/2024",
    status: "In Residence",
    tenancyAgreement: "Agreement_John.pdf",
  },
  {
    key: "2",
    name: "Jane Smith",
    email: "janesmith@gmail.com",
    idNumber: "87654321",
    phoneNumber: "254700123456",
    apartment: "Block C",
    unit: "C01",
    dateCreated: "03/04/2024",
    status: "Vacated",
    tenancyAgreement: "Agreement_Jane.pdf",
    dateVacated: "10/06/2024",
  },
  {
    key: "3",
    name: "Jake Park",
    email: "jakepark@gmail.com",
    idNumber: "11223344",
    phoneNumber: "254711223344",
    apartment: "Block D",
    unit: "D01",
    dateCreated: "04/04/2024",
    status: "Vacated",
    tenancyAgreement: "Agreement_Jake.pdf",
    dateVacated: "12/07/2024",
  },
  {
    key: "4",
    name: "Amelia Brown",
    email: "ameliabrown@gmail.com",
    idNumber: "99887766",
    phoneNumber: "254722998877",
    apartment: "Block A",
    unit: "A03",
    dateCreated: "05/04/2024",
    status: "In Residence",
    tenancyAgreement: "Agreement_Amelia.pdf",
  },
];

/* -------------------- Component -------------------- */
const TenantsTable: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "in" | "vacated">("all");
  const [tenantData, setTenantData] = useState<Tenant[]>(initialData);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTenant, setCurrentTenant] = useState<TenantFormValues | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [tenantToDelete, setTenantToDelete] = useState<Tenant | null>(null);

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  /* -------------------- Apartments -------------------- */
  const apartments: Apartmentos[] = [
    {
      name: "Apartment A",
      units: ["Unit 1", "Unit 2"].map((u) => ({
        id: u,
        name: u,
        occupied: false,
      })),
    },
    {
      name: "Apartment B",
      units: ["Unit 3", "Unit 4"].map((u) => ({
        id: u,
        name: u,
        occupied: false,
      })),
    },
  ];

  /* -------------------- Handlers -------------------- */
 const handleSubmit = (formValues: TenantFormValues) => {
  if (formValues.status === "inResidence") {
    const isOccupied = tenantData.some(
      (tenant) =>
        tenant.apartment === formValues.apartment &&
        tenant.unit === formValues.unit &&
        tenant.status === "In Residence" &&
        tenant.email !== currentTenant?.email // allow editing same tenant
    );

    if (isOccupied) {
      Modal.error({
        title: "Unit Already Occupied",
        content: `The unit ${formValues.unit} in ${formValues.apartment} is already occupied by another tenant.`,
      });
      return; // stop submit
    }
  }

  if (currentTenant) {
    // Edit existing tenant
    setTenantData((prev) =>
      prev.map((tenant) =>
        tenant.email === currentTenant.email
          ? {
              ...tenant,
              name: formValues.fullName,
              email: formValues.email,
              idNumber: formValues.idNumber,
              phoneNumber: formValues.phoneNumber,
              apartment: formValues.apartment,
              unit: formValues.unit,
              status:
                formValues.status === "inResidence" ? "In Residence" : "Vacated",
              tenancyAgreement: formValues.tenancyAgreement,
              dateVacated:
                formValues.status === "vacated" ? formValues.dateVacated : undefined,
            }
          : tenant
      )
    );
  } else {
    // Add new tenant
    const newTenant: Tenant = {
      key: String(Date.now()),
      name: formValues.fullName,
      email: formValues.email,
      idNumber: formValues.idNumber,
      phoneNumber: formValues.phoneNumber,
      apartment: formValues.apartment,
      unit: formValues.unit,
      status:
        formValues.status === "inResidence" ? "In Residence" : "Vacated",
      dateCreated: new Date().toLocaleDateString(),
      tenancyAgreement: formValues.tenancyAgreement || undefined,
      dateVacated:
        formValues.status === "vacated" ? formValues.dateVacated : undefined,
    };

    setTenantData((prev) => [...prev, newTenant]);
  }

  setIsModalVisible(false);
  setCurrentTenant(null);
  setFileList([]);
};


  const showModal = (tenant: Tenant | null = null) => {
    if (tenant) {
      setCurrentTenant({
        fullName: tenant.name,
        email: tenant.email,
        idNumber: tenant.idNumber,
        phoneNumber: tenant.phoneNumber,
        apartment: tenant.apartment,
        unit: tenant.unit,
        status: tenant.status === "In Residence" ? "inResidence" : "vacated",
        tenancyAgreement: tenant.tenancyAgreement,
        dateVacated: tenant.dateVacated,
      });
      setFileList(
        tenant.tenancyAgreement
          ? [
              {
                uid: "-1",
                name: tenant.tenancyAgreement,
                status: "done",
                url: `/agreements/${tenant.tenancyAgreement}`,
              },
            ]
          : []
      );
    } else {
      setCurrentTenant(null);
      setFileList([]);
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setFileList([]);
  };

  const handleDeleteClick = (tenant: Tenant) => {
    setTenantToDelete(tenant);
    setDeleteModalOpen(true);
  };

  const handleDeleteTenant = () => {
    if (tenantToDelete) {
      setTenantData((prev) => prev.filter((t) => t.key !== tenantToDelete.key));
    }
    setDeleteModalOpen(false);
  };

  /* -------------------- Filters -------------------- */
  const filteredData = tenantData.filter((item) => {
    const searchMatch = item.name.toLowerCase().includes(searchText.toLowerCase());
    const statusMatch =
      statusFilter === "all" ||
      (statusFilter === "in" && item.status === "In Residence") ||
      (statusFilter === "vacated" && item.status === "Vacated");
    return searchMatch && statusMatch;
  });

  /* -------------------- Columns -------------------- */
  const columns = [
    { title: "Name", dataIndex: "name", key: "name", ellipsis: true, sorter: (a: Tenant, b: Tenant) => a.name.localeCompare(b.name) },
    { title: "Email", dataIndex: "email", key: "email", ellipsis: true },
    { title: "Phone", dataIndex: "phoneNumber", key: "phoneNumber", ellipsis: true },
    { title: "Apartment", dataIndex: "apartment", key: "apartment" },
    { title: "Unit", dataIndex: "unit", key: "unit" },
    { title: "Date Created", dataIndex: "dateCreated", key: "dateCreated" },
    {
      title: "Tenancy Agreement",
      dataIndex: "tenancyAgreement",
      key: "tenancyAgreement",
      render: (text: string) =>
        text ? (
          <a href={`/leasing-agreement/${text}`} target="_blank" rel="noopener noreferrer">
            <FileTextOutlined /> {text}
          </a>
        ) : (
          "N/A"
        ),
    },
    { title: "Date Vacated", dataIndex: "dateVacated", key: "dateVacated", render: (date: string) => date || "—" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <Badge color={status === "In Residence" ? "green" : "orange"} text={status} />,
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

  /* -------------------- Render -------------------- */
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

      {/* Create/Edit Modal */}
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
          onSubmit={handleSubmit}
          apartments={apartments}
        />
      </Modal>

      {/* Delete Modal */}
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
