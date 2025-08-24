"use client";

import React, { useState, useMemo } from "react";
import { Table, Button, Badge, Space, Modal, Select, notification } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";

import CreateTenantForm from "@/features/tenants/create-tenant-form";
import DeleteTenantModal from "@/app/lcmapplication/protected/modals/delete-tenant/delete-tenant";
import AddTenantButton from "@/app/lcmapplication/protected/widgets/addButton/AddTenantButton";
import SearchInput from "@/app/lcmapplication/protected/widgets/search/SearchInput";
import { Apartmentos } from "@/app/lcmapplication/types/invoice";

import "./tenants.css";

const { Option } = Select;

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
  leaseAgreement?: File | null;
}

const initialData: Tenant[] = [
  {
    key: "1",
    name: "John Doe",
    email: "johndoe@gmail.com",
    idNumber: "12345678",
    phoneNumber: "254742792965",
    apartment: "Apartment B",
    unit: "unit c",
    dateCreated: "02/04/2024",
    status: "In Residence",
    tenancyAgreement: "Agreement_John.pdf",
  },
];

const TenantsTable: React.FC = () => {
  const [tenantData, setTenantData] = useState<Tenant[]>(initialData);
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all:all");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTenant, setCurrentTenant] = useState<TenantFormValues | null>(
    null
  );

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [tenantToDelete, setTenantToDelete] = useState<Tenant | null>(null);

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

  // Mark units as occupied
  const apartmentsWithOccupancy = useMemo(
    () =>
      apartments.map((apt) => ({
        ...apt,
        units: apt.units.map((unit) => ({
          ...unit,
          occupied: tenantData.some(
            (t) =>
              t.apartment === apt.name &&
              t.unit === unit.name &&
              t.status === "In Residence"
          ),
        })),
      })),
    [tenantData]
  );

 const handleSubmit = (formValues: TenantFormValues) => {
  const tenancyFile = formValues.leaseAgreement || undefined;

  // Check if the unit is already occupied
  const isOccupied = tenantData.some(
    (t) =>
      t.apartment === formValues.apartment &&
      t.unit === formValues.unit &&
      t.status === "In Residence" &&
      (!currentTenant || t.email !== currentTenant.email) // ignore current tenant if editing
  );

  if (isOccupied) {
    notification.error({
      message: "Unit Occupied",
      description: "This unit is already occupied by another tenant.",
      placement: "topRight",
      duration: 3,
    });
    return;
  }

  if (currentTenant) {
    // Editing
    setTenantData((prev) =>
      prev.map((t) =>
        t.email === currentTenant.email
          ? {
              ...t,
              name: formValues.fullName,
              email: formValues.email,
              idNumber: formValues.idNumber,
              phoneNumber: formValues.phoneNumber,
              apartment: formValues.apartment,
              unit: formValues.unit,
              status:
                formValues.status === "inResidence"
                  ? "In Residence"
                  : "Vacated",
              tenancyAgreement: tenancyFile,
              dateVacated:
                formValues.status === "vacated"
                  ? formValues.dateVacated
                  : undefined,
            }
          : t
      )
    );
    
     notification.success({
      message: "Tenant Updated",
      description: `${formValues.fullName} was updated successfully.`,
      placement: "topRight",
      duration: 3,
    });
  } else {
    // Adding
    setTenantData((prev) => [
      ...prev,
      {
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
        tenancyAgreement: tenancyFile,
        dateVacated:
          formValues.status === "vacated" ? formValues.dateVacated : undefined,
      },
    ]);

     notification.success({
      message: "",
      description: `${formValues.fullName} was added successfully.`,
      placement: "topRight",
      duration: 1.5,
    });
  }

  setIsModalVisible(false);
  setCurrentTenant(null);
};


  const showModal = (tenant?: Tenant) => {
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
        leaseAgreement:
          tenant.tenancyAgreement instanceof File
            ? tenant.tenancyAgreement
            : null,
      });
    } else {
      setCurrentTenant(null);
    }
    setIsModalVisible(true);
  };

  const handleDeleteTenant = () => {
    if (tenantToDelete)
      setTenantData((prev) => prev.filter((t) => t.key !== tenantToDelete.key));
    setDeleteModalOpen(false);
    setTenantToDelete(null);
  };

  const filteredData = tenantData.filter((t) => {
    const searchMatch = t.name.toLowerCase().includes(searchText.toLowerCase());
    if (selectedFilter === "all:all") return searchMatch;

    const [type, value] = selectedFilter.split(":");
    if (type === "status")
      return (
        searchMatch &&
        (value === "in" ? t.status === "In Residence" : t.status === "Vacated")
      );
    if (type === "apartment") return searchMatch && t.apartment === value;
    if (type === "unit") return searchMatch && t.unit === value;
    return true;
  });

  const filterOptions = [
    { label: "All Tenants", value: "all:all" },
    { label: "In Residence", value: "status:in" },
    { label: "Vacated", value: "status:vacated" },
    ...apartments.map((apt) => ({
      label: apt.name,
      value: `apartment:${apt.name}`,
    })),
    ...apartments.flatMap((apt) =>
      apt.units.map((u) => ({
        label: `${u.name} (${apt.name})`,
        value: `unit:${u.name}`,
      }))
    ),
  ];

  const columns = [
    { title: "Name", dataIndex: "name", key: "name", ellipsis: true },
    { title: "Email", dataIndex: "email", key: "email", ellipsis: true },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      ellipsis: true,
    },
    { title: "Apartment", dataIndex: "apartment", key: "apartment" },
    { title: "Unit", dataIndex: "unit", key: "unit" },
    { title: "Date Created", dataIndex: "dateCreated", key: "dateCreated" },
    {
      title: "Tenancy Agreement",
      dataIndex: "tenancyAgreement",
      key: "tenancyAgreement",
      render: (agreement: File | string | undefined) => {
        if (!agreement) return "N/A";
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
        const fileName = agreement.split("/").pop() || agreement;
        return (
          <a href={`/agreements/${agreement}`} download={fileName}>
            {fileName}
          </a>
        );
      },
    },
    {
      title: "Date Vacated",
      dataIndex: "dateVacated",
      key: "dateVacated",
      render: (d: any) => d || "—",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (
        s:
          | string
          | number
          | bigint
          | boolean
          | React.ReactElement<
              unknown,
              string | React.JSXElementConstructor<any>
            >
          | Iterable<React.ReactNode>
          | Promise<
              | string
              | number
              | bigint
              | boolean
              | React.ReactPortal
              | React.ReactElement<
                  unknown,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | null
              | undefined
            >
          | null
          | undefined
      ) => <Badge color={s === "In Residence" ? "green" : "orange"} text={s} />,
    },
    {
      title: "Actions",
      key: "action",
      render: (_: any, record: Tenant) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            type="link"
            onClick={() => showModal(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            type="link"
            danger
            onClick={() => {
              setTenantToDelete(record);
              setDeleteModalOpen(true);
            }}
          />
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
            value={selectedFilter}
            onChange={setSelectedFilter}
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

      <Modal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        destroyOnClose
        width="fit-content"
        style={{ maxWidth: "90%" }}
      >
        <CreateTenantForm
          title={currentTenant ? "Edit Tenant" : "Add Tenant"}
          initialValues={currentTenant}
          onCancel={() => setIsModalVisible(false)}
          onSubmit={handleSubmit}
          apartments={apartmentsWithOccupancy}
        />
      </Modal>

      {tenantToDelete && (
        <DeleteTenantModal
          open={deleteModalOpen}
          tenantName={tenantToDelete.name}
          onDelete={handleDeleteTenant}
          onCancel={() => {
            setDeleteModalOpen(false);
            setTenantToDelete(null);
          }}
          onArchive={() => setDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};

export default TenantsTable;
