"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Table,
  Tooltip,
  Tag,
  Popconfirm,
  Space,
  notification,
} from "antd";
import {
  AppstoreOutlined,
  UnorderedListOutlined,
  HomeOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import "./apartments.css";
import CreateApartmentForm from "@/app/lcmapplication/forms/add-apartment/createApartmentForm";
import AddTenantButton from "@/app/lcmapplication/protected/widgets/addButton/AddTenantButton";
import ApartmentCard from "@/app/lcmapplication/protected/widgets/ApartmentCard/ApartmentCard";
import SearchInput from "@/app/lcmapplication/protected/widgets/search/SearchInput";
import { Apartment, ApartmentStatus } from "@/app/lcmapplication/types/invoice";
import { ColumnsType } from "antd/es/table";
import ApartmentDetails from "@/app/lcmapplication/protected/modals/apartment-details/view-apartment";
import { addApartmentsService } from "@/apiActions/tenantsApis/services/apartments/add.apartment.service";
import { useRouter } from "next/navigation";
import { Router } from "lucide-react";
import { deleteApartmentService } from "@/apiActions/tenantsApis/services/apartments/delete.apartment,service";
import { updatedApartmentService } from "@/apiActions/tenantsApis/services/apartments/update.apartment.service";
import { ApartmentFormData } from "@/apiActions/tenantsApis/dto/Apartment.dto";




interface props{
  apartments:Apartment[]
}
const Apartments: React.FC<props> = ({ apartments }) => {

  const [hasMounted, setHasMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingApartment, setEditingApartment] = useState<Apartment | null>(null);
  const [viewingApartment, setViewingApartment] = useState<Apartment | null>(null);
  const [isListView, setIsListView] = useState(false);

  const apartmentsPerPage = 8;

  useEffect(() => {
    setHasMounted(true);
  }, []);

const router= useRouter()




const handleAddApartment = async (data: ApartmentFormData) => {
  if (editMode && editingApartment) {
    await updatedApartmentService(data, editingApartment.id);

    router.refresh();
    notification.success({
      message: "Apartment Updated",
      description: `${data.name} was updated successfully.`,
      placement: "topRight",
    });
  } else {
    await addApartmentsService(data);

    router.refresh();
    notification.success({
      message: "Apartment Added",
      description: `${data.name} was added successfully.`,
      placement: "topRight",
    });
  }

  setIsModalOpen(false);
  setEditMode(false);
  setEditingApartment(null);
};



  const filteredApartments = apartments.filter((apt) =>
    apt.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredApartments.length / apartmentsPerPage);
  const indexOfLastApartment = currentPage * apartmentsPerPage;
  const indexOfFirstApartment = indexOfLastApartment - apartmentsPerPage;
  const currentApartments = filteredApartments.slice(indexOfFirstApartment, indexOfLastApartment);

  const handleView = (record: Apartment) => {
    setViewingApartment(record);
    setIsViewModalOpen(true);
  };

const handleEdit = (record: Apartment) => {
  setEditMode(true);
  setEditingApartment(record);
  setIsModalOpen(true);
};


 
const handleDelete = async (id: number, name?: string) => {
  try {
    await deleteApartmentService(id);
    router.refresh();
    notification.success({
      message: "Apartment Deleted",
      description: `${name || "Apartment"} was deleted successfully.`,
      placement: "topRight",
    });
  } catch (error) {
    notification.error({
      message: "Delete Failed",
      description: "Unable to delete Apartment. Please try again.",
    });
  }
};





  const columns: ColumnsType<Apartment> = [
    {
      title: "Apartment",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text) => <span><HomeOutlined style={{ marginRight: 8, color: "#1890ff" }} />{text}</span>
    },
    {
      title: "Unit Types",
      dataIndex: "unitTypes",
      key: "unitTypes",
      sorter: (a, b) => a.unitTypes.length - b.unitTypes.length,
      render: (unitTypes: string[]) => <span>{unitTypes.length} Unit(s)</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Letting", value: "Letting" },
        { text: "Under construction", value: "Under construction" },
        { text: "Sold out", value: "Sold out" },
      ],
      onFilter: (value, record) => typeof value === "string" ? record.status === value : false,
      render: (status: ApartmentStatus) => (
        <Tag color={status === "Letting" ? "blue" : status === "Under construction" ? "green" : "red"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="View">
            <Button type="link" icon={<EyeOutlined />} onClick={() => handleView(record)} />
          </Tooltip>
          <Tooltip title="Edit">
            <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
  title="Are you sure you want to delete this apartment?"
  onConfirm={() => handleDelete(record.id, record.title)}
  okText="Yes"
  cancelText="No"
>
  <Button type="link" danger icon={<DeleteOutlined />} />
</Popconfirm>

          </Tooltip>
        </Space>
      ),
    },
  ];

  if (!hasMounted) return null;

  return (
    <div className="apartments-content">
      <div className="apartments-header">
        <h2>APARTMENTS</h2>
        <div className="filters-inline">
          <SearchInput
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            placeholder="Search apartments..."
          />
          <AddTenantButton
            onClick={() => { setIsModalOpen(true); setEditMode(false); setEditingApartment(null); }}
            label="+ Add Apartment"
          />
          <Tooltip title={isListView ? "Grid view" : "List view"}>
            <Button
              shape="circle"
              icon={isListView ? <AppstoreOutlined /> : <UnorderedListOutlined />}
              onClick={() => setIsListView(!isListView)}
            />
          </Tooltip>
        </div>
      </div>

      {isListView ? (
        <Table
          dataSource={currentApartments}
          columns={columns}
          rowKey="id"
          pagination={{ current: currentPage, pageSize: apartmentsPerPage, total: filteredApartments.length, onChange: setCurrentPage }}
          className="apartments-table"
        />
      ) : (
        <div className="apartments-grid">
          {currentApartments.map((apt) => (
            <ApartmentCard
              key={apt.id}
              title={apt.title}
              units={apt.unitTypes!}
              status={apt.status}
              address={apt.address || "Unknown"}
             actions={
  <div className="apartment-card-actions" style={{ display: "flex", gap: 8 }}>
    <Tooltip title="View Details">
      <Button
        type="link"
        icon={<EyeOutlined />}
        onClick={() => {
          setViewingApartment({ ...apt, address: apt.address || "Unknown" });
          setIsViewModalOpen(true);
        }}
        aria-label={`View details for ${apt.title}`}
      />
    </Tooltip>

    <Tooltip title="Edit Apartment">
      <Button
        type="link"
        icon={<EditOutlined />}
        onClick={() => handleEdit(apt)}
        aria-label={`Edit ${apt.title}`}
      />
    </Tooltip>

    <Tooltip title="Delete Apartment">
      <Popconfirm
        title="Are you sure you want to delete this apartment?"
        onConfirm={() => handleDelete(apt.id, apt.title)}
        okText="Yes"
        cancelText="No"
      >
        <Button
          type="link"
          danger
          icon={<DeleteOutlined />}
          aria-label={`Delete ${apt.title}`}
        />
      </Popconfirm>
    </Tooltip>
  </div>
}


            
              
            />
          ))}
        </div>
      )}

     <Modal
  title={editMode ? "Edit Apartment" : "Add Apartment"}
  open={isModalOpen}
  onCancel={() => {
    setIsModalOpen(false);
    setEditMode(false);
    setEditingApartment(null);
  }}
  footer={null}
  destroyOnClose
>
  {hasMounted && (
<CreateApartmentForm
  onSubmit={handleAddApartment}
  defaultValues={
    editingApartment
      ? {
          name: editingApartment.title,
          unitType: editingApartment.unitTypes,
          status: editingApartment.status,
          location: editingApartment.address || "Unknown",
          waterUnitCost: editingApartment.waterUnitCost ?? 0,
        }
      : undefined
  }
/>

  )}
</Modal>

      <Modal
        open={isViewModalOpen}
        onCancel={() => setIsViewModalOpen(false)}
        footer={null}
        destroyOnClose
        width="fit-content"
        centered
      >
        {viewingApartment && (
          <ApartmentDetails
            apartmentName={viewingApartment.title}
            unitTypes={viewingApartment.unitTypes}
            address={viewingApartment.address || "Unknown"}
          />
        )}
      </Modal>
    </div>
  );
};

export default Apartments;
