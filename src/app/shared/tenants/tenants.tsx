"use client";

import React, { useState, useMemo } from "react";
import { Table, Button, Badge, Space, Modal, Select, notification } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import type { ColumnsType } from "antd/es/table";
import type { UploadFile } from "antd/es/upload/interface";

import CreateTenantForm from "@/features/tenants/create-tenant-form";
import DeleteTenantModal from "@/app/lcmapplication/protected/modals/delete-tenant/delete-tenant";
import AddTenantButton from "@/app/lcmapplication/protected/widgets/addButton/AddTenantButton";
import SearchInput from "@/app/lcmapplication/protected/widgets/search/SearchInput";
import { Apartmentos } from "@/app/lcmapplication/types/invoice";
import { addTenantsService } from "@/apiActions/tenantsApis/services/tenants/add.tenants.service";
import { deleteTenantService } from "@/apiActions/tenantsApis/services/tenants/delete.tenant.service";
import { Tenant } from "@/apiActions/tenantsApis/dto/tenant.dto";

import "./tenants.css";
import { updatedTenantService } from "@/apiActions/tenantsApis/services/tenants/update.tenant.service";

const { Option } = Select;

interface TenantFormValues {
  key?: string;
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

interface Props {
  tenantsData: Tenant[];
}

const baseApartments: Apartmentos[] = [
  {
    name: "Apartment A",
    units: ["Unit 1", "Unit 2"].map((u) => ({ id: u, name: u, occupied: false })),
  },
  {
    name: "Apartment B",
    units: ["Unit 3", "Unit 4"].map((u) => ({ id: u, name: u, occupied: false })),
  },
];

const TenantsTable: React.FC<Props> = ({ tenantsData }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all:all");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTenant, setCurrentTenant] = useState<TenantFormValues | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [tenantToDelete, setTenantToDelete] = useState<Tenant | null>(null);
  const router = useRouter();

  // Compute unit occupancy dynamically
  const apartmentsWithOccupancy = useMemo(
    () =>
      baseApartments.map((apt) => ({
        ...apt,
        units: apt.units.map((unit) => ({
          ...unit,
          occupied: tenantsData.some(
            (t) => t.apartment === apt.name && t.unit === unit.name && t.status === "In Residence"
          ),
        })),
      })),
    [tenantsData]
  );

  const handleSubmit = async (formValues: TenantFormValues) => {
    const isOccupied = tenantsData.some(
      (t) =>
        t.apartment === formValues.apartment &&
        t.unit === formValues.unit &&
        t.status === "In Residence" &&
        (!currentTenant || t.email !== currentTenant.email)
    );

    if (isOccupied) {
      notification.error({
        message: "Unit Occupied",
        description: "This unit is already occupied by another tenant.",
        placement: "topRight",
      });
      return;
    }

    try {
      if (currentTenant) {
        await updatedTenantService(formValues, formValues.key!);
        notification.success({
          message: "Tenant Updated",
          description: `${formValues.fullName} was updated successfully.`,
          placement: "topRight",
        });
      } else {
        await addTenantsService(formValues);
        notification.success({
          message: "Tenant Added",
          description: `${formValues.fullName} was added successfully.`,
          placement: "topRight",
        });
      }

      router.refresh();
      setIsModalVisible(false);
      setCurrentTenant(null);
    } catch (error) {
      notification.error({
        message: "Action Failed",
        description: "Something went wrong while saving the tenant.",
      });
    }
  };

  const openTenantModal = (tenant?: Tenant) => {
    setCurrentTenant(
      tenant
        ? {
            key: tenant.key,
            fullName: tenant.name,
            email: tenant.email,
            idNumber: tenant.idNumber,
            phoneNumber: tenant.phoneNumber,
            apartment: tenant.apartment,
            unit: tenant.unit,
            status: tenant.status === "In Residence" ? "inResidence" : "vacated",
            dateVacated: tenant.dateVacated,
            leaseAgreement: tenant.tenancyAgreement instanceof File ? tenant.tenancyAgreement : null,
          }
        : null
    );
    setIsModalVisible(true);
  };

  const confirmDeleteTenant = async () => {
    if (!tenantToDelete) return;
    try {
      await deleteTenantService(tenantToDelete.key!);
      router.refresh();
      notification.success({
        message: "Tenant Deleted",
        description: `${tenantToDelete.name} was deleted successfully.`,
        placement: "topRight",
      });
    } catch {
      notification.error({
        message: "Delete Failed",
        description: "Unable to delete tenant. Please try again.",
      });
    } finally {
      setDeleteModalOpen(false);
      setTenantToDelete(null);
    }
  };

  const filteredData = tenantsData.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchText.toLowerCase());
    if (selectedFilter === "all:all") return matchesSearch;

    const [type, value] = selectedFilter.split(":");
    if (type === "status")
      return matchesSearch && (value === "in" ? t.status === "In Residence" : t.status === "Vacated");
    if (type === "apartment") return matchesSearch && t.apartment === value;
    if (type === "unit") return matchesSearch && t.unit === value;
    return true;
  });

  const filterOptions = [
    { label: "All Tenants", value: "all:all" },
    { label: "In Residence", value: "status:in" },
    { label: "Vacated", value: "status:vacated" },
    ...baseApartments.map((apt) => ({ label: apt.name, value: `apartment:${apt.name}` })),
    ...baseApartments.flatMap((apt) =>
      apt.units.map((u) => ({ label: `${u.name} (${apt.name})`, value: `unit:${u.name}` }))
    ),
  ];

  const columns: ColumnsType<Tenant> = [
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
        if (agreement instanceof File) {
          const url = URL.createObjectURL(agreement);
          return (
            <a href={url} download={agreement.name} onClick={() => setTimeout(() => URL.revokeObjectURL(url), 1000)}>
              {agreement.name}
            </a>
          );
        }
        const fileName = agreement.split("/").pop() || agreement;
        return <a href={`/agreements/${agreement}`} download={fileName}>{fileName}</a>;
      },
    },
    {
      title: "Date Vacated",
      dataIndex: "dateVacated",
      key: "dateVacated",
      render: (d) => d || "—",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Badge color={status === "In Residence" ? "green" : "orange"} text={status} />,
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} type="link" onClick={() => openTenantModal(record)} />
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
          <SearchInput value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search tenants..." />
          <Select value={selectedFilter} onChange={setSelectedFilter} style={{ minWidth: 200 }} placeholder="Filter tenants">
            {filterOptions.map((opt) => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>
          <AddTenantButton onClick={() => openTenantModal()} label="+ Add Tenant" />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 8 }}
        bordered
        rowClassName={() => "custom-table-row"}
      />

      <Modal open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null} destroyOnClose width="fit-content">
        <CreateTenantForm
          title={currentTenant ? "Edit Tenant" : "Add Tenant"}
          initialValues={currentTenant}
          onCancel={() => setIsModalVisible(false)}
          onSubmit={handleSubmit}
          apartments={apartmentsWithOccupancy}
          tenantId={currentTenant?.key!}
        />
      </Modal>

      {tenantToDelete && (
        <DeleteTenantModal
          open={deleteModalOpen}
          tenantName={tenantToDelete.name}
          onDelete={confirmDeleteTenant}
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
