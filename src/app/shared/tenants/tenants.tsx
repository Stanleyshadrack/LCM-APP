"use client";

import React, { useState } from "react";
import { Table, Button, Badge, Space, Modal, Select } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
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
  tenancyAgreement?: File | string;
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
  dateVacated?: string;
  leaseAgreement?: File | null; // 👈 only this for uploads
}

/* -------------------- Initial Data -------------------- */
const initialData: Tenant[] = [
  {
    key: "1",
    name: "John Doe",
    email: "johndoe@gmail.com",
    idNumber: "12345678",
    phoneNumber: "254742792965",
    apartment: "Apartment B",
    unit: "unit 3",
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
    apartment: "Apartment B",
    unit: "unit 3",
    dateCreated: "03/04/2024",
    status: "Vacated",
    tenancyAgreement: "Agreement_Jane.pdf",
    dateVacated: "10/06/2024",
  },
];

/* -------------------- Component -------------------- */
const TenantsTable: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "in" | "vacated">("all");
  const [tenantData, setTenantData] = useState<Tenant[]>(initialData);
  const [apartmentFilter, setApartmentFilter] = useState<string>("all");
  const [unitFilter, setUnitFilter] = useState<string>("all");
  const [selectedFilter, setSelectedFilter] = useState<string>("all:all");


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTenant, setCurrentTenant] = useState<TenantFormValues | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [tenantToDelete, setTenantToDelete] = useState<Tenant | null>(null);

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  /* -------------------- Apartments -------------------- */
  const apartments: Apartmentos[] = [
  {
    name: "Apartment A",
    units: ["Unit 1", "Unit 2"].map((u) => ({ id: u, name: u, occupied: false })),
  },
  {
    name: "Apartment B",
    units: ["Unit 3", "Unit 4"].map((u) => ({ id: u, name: u, occupied: false })),
  },
];

  /* -------------------- Handlers -------------------- */
  const handleSubmit = (formValues: TenantFormValues) => {
    let tenancyFile: File | string | undefined = formValues.leaseAgreement || undefined;

    if (currentTenant) {
      // Editing
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
                status: formValues.status === "inResidence" ? "In Residence" : "Vacated",
                tenancyAgreement: tenancyFile,
                dateVacated:
                  formValues.status === "vacated" ? formValues.dateVacated : undefined,
              }
            : tenant
        )
      );
    } else {
      // Adding
      const newTenant: Tenant = {
        key: String(Date.now()),
        name: formValues.fullName,
        email: formValues.email,
        idNumber: formValues.idNumber,
        phoneNumber: formValues.phoneNumber,
        apartment: formValues.apartment,
        unit: formValues.unit,
        status: formValues.status === "inResidence" ? "In Residence" : "Vacated",
        dateCreated: new Date().toLocaleDateString(),
        tenancyAgreement: tenancyFile,
        dateVacated:
          formValues.status === "vacated" ? formValues.dateVacated : undefined,
      };

      setTenantData((prev) => [...prev, newTenant]);
    }

    setIsModalVisible(false);
    setCurrentTenant(null);
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
      dateVacated: tenant.dateVacated,
      leaseAgreement: tenant.tenancyAgreement instanceof File ? tenant.tenancyAgreement : null,
    });
  } else {
    setCurrentTenant(null);
  }

  setIsModalVisible(true);
};


  const handleCancel = () => {
    setIsModalVisible(false);
    setFileList([]);
  };

  const handleDeleteModalCancel = () => {
  setDeleteModalOpen(false);
  setTenantToDelete(null);
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
  // Search filter
  const searchMatch = item.name.toLowerCase().includes(searchText.toLowerCase());

  // Unified filter
  if (selectedFilter === "all:all") return searchMatch;

  const [type, value] = selectedFilter.split(":");

  let filterMatch = true;
  switch (type) {
    case "status":
      filterMatch = value === "in" ? item.status === "In Residence" : item.status === "Vacated";
      break;
    case "apartment":
      filterMatch = item.apartment === value;
      break;
    case "unit":
      filterMatch = item.unit === value;
      break;
  }

  return searchMatch && filterMatch;
});

const apartmentsWithOccupancy = apartments.map((apt) => ({
  ...apt,
  units: apt.units.map((unit) => ({
    ...unit,
    occupied: tenantData.some(
      (tenant) =>
        tenant.apartment === apt.name &&
        tenant.unit === unit.name &&
        tenant.status === "In Residence"
    ),
  })),
}));





const filterOptions = [
  { label: "All Tenants", value: "all:all" },

  // Status
  { label: "In Residence", value: "status:in" },
  { label: "Vacated", value: "status:vacated" },

  // Apartments
  ...apartments.map((apt) => ({ label: apt.name, value: `apartment:${apt.name}` })),

  // Units
  ...apartments.flatMap((apt) =>
    apt.units.map((unit) => ({ label: `${unit.name} (${apt.name})`, value: `unit:${unit.name}` }))
  ),
];


  /* -------------------- Columns -------------------- */
  const columns = [
    { title: "Name", dataIndex: "name", key: "name", ellipsis: true },
    { title: "Email", dataIndex: "email", key: "email", ellipsis: true },
    { title: "Phone", dataIndex: "phoneNumber", key: "phoneNumber", ellipsis: true },
    { title: "Apartment", dataIndex: "apartment", key: "apartment" },
    { title: "Unit", dataIndex: "unit", key: "unit" },
    { title: "Date Created", dataIndex: "dateCreated", key: "dateCreated" },

   {
  title: "Tenancy Agreement",
  dataIndex: "tenancyAgreement",
  key: "tenancyAgreement",
  render: (agreement: File | string | undefined) => {
    if (!agreement) return "N/A";

    // Case 1: New File upload
    if (agreement instanceof File) {
      const url = URL.createObjectURL(agreement);
      return (
        <a
          href={url}
          download={agreement.name}
          onClick={() => setTimeout(() => URL.revokeObjectURL(url), 1000)}
        >
          {agreement.name}
        </a>
      );
    }

    // Case 2: Existing string (filename)
    const fileName = agreement.split("/").pop() || agreement;
    return (
      <a href={`/agreements/${agreement}`} download={fileName}>
        {fileName}
      </a>
    );
  },
},


    { title: "Date Vacated", dataIndex: "dateVacated", key: "dateVacated", render: (date: string) => date || "—" },
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
  value={selectedFilter}
  onChange={(val) => setSelectedFilter(val)}
  style={{ minWidth: 200 }}
  placeholder="Filter tenants"
>
  {filterOptions.map((opt) => (
    <Option key={opt.value} value={opt.value}>
      {opt.label}
    </Option>
  ))}
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
          apartments={apartmentsWithOccupancy }
          
        />
      </Modal>

      {/* Delete Modal */}
      {tenantToDelete && (
        <DeleteTenantModal
          open={deleteModalOpen}
          tenantName={tenantToDelete.name}
          onDelete={handleDeleteTenant}
          onCancel={handleDeleteModalCancel}
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
