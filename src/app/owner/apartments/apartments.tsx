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

const Apartments = () => {
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

const [apartments, setApartments] = useState<Apartment[]>([
  {
    id: 1,
    title: "Green Heights",
    units: [
      { unit: "B01", unitType: "1BR", status: "Occupied" },
      { unit: "B02", unitType: "2BR", status: "Vacated" },
      { unit: "B03", unitType: "Studio", status: "Occupied" },
    ],
    unitTypes: ["1BR","2BR","Studio"],
    status: ApartmentStatus.Letting,
    address: "Kilimani, Nairobi",
  },
  {
    id: 2,
    title: "Silver Towers",
    units: [
      { unit: "C01", unitType: "2BR", status: "Occupied" },
      { unit: "C02", unitType: "3BR", status: "Vacated" },
    ],
    unitTypes: ["2BR","3BR"],
    status: ApartmentStatus.UnderConstruction,
    address: "Westlands, Nairobi",
  },
  {
    id: 3,
    title: "Sunset Apartments",
    units: [
      { unit: "D01", unitType: "Studio", status: "Vacated" },
      { unit: "D02", unitType: "1BR", status: "Occupied" },
    ],
    unitTypes: ["Studio","1BR"],
    status: ApartmentStatus.Letting,
    address: "Kilimani, Nairobi",
  },
  // ...continue for the rest
]);



 const handleAddApartment = (data: {
  name: string;
  unitType: string[];
  status: ApartmentStatus;
  location: string;
  waterUnitCost: number;
}) => {
  const createUnits = (types: string[]) =>
    types.map((type, index) => ({
      unit: `${type}-${index + 1}`, // generate a simple unit ID
      unitType: type,
      status: "Vacated", // default status
    }));

  if (editMode && editingApartment) {
    setApartments((prev) =>
      prev.map((a) =>
        a.id === editingApartment.id
          ? {
              ...a,
              title: data.name,
              unitTypes: data.unitType,
              units: createUnits(data.unitType),
              status: data.status,
            }
          : a
      )
    );
    notification.success({
      message: "Apartment Updated",
      description: `${data.name} was updated successfully.`,
      placement: "topRight",
    });
  } else {
    const newId = Math.max(0, ...apartments.map((a) => a.id)) + 1;
    setApartments((prev) => [
      ...prev,
      {
        id: newId,
        title: data.name,
        unitTypes: data.unitType,
        units: createUnits(data.unitType),
        status: data.status,
        address: data.location,
      },
    ]);
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

  const handleDelete = (id: number) => setApartments((prev) => prev.filter((a) => a.id !== id));

  const columns: ColumnsType<Apartment> = [
    {
      title: "Apartment",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text) => <span><HomeOutlined style={{ marginRight: 8, color: "#1890ff" }} />{text}</span>
    },
    {
      title: "Units",
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
              onConfirm={() => handleDelete(record.id)}
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
              units={apt.units}
              status={apt.status}
              address={apt.address || "Unknown"}
              actions={
                <div className="apartment-card-actions">
                  <Tooltip title="View Details">
                    <Button
                      type="link"
                      icon={<EyeOutlined />}
                      onClick={() => { setViewingApartment({ ...apt, address: apt.address || "Unknown" }); setIsViewModalOpen(true); }}
                      aria-label={`View details for ${apt.title}`}
                    />
                  </Tooltip>

                 

                </div>
              }
            />
          ))}
        </div>
      )}

      <Modal
        open={isModalOpen}
        onCancel={() => { setIsModalOpen(false); setEditMode(false); setEditingApartment(null); }}
        footer={null}
        destroyOnClose
      >
        {hasMounted && (
          <CreateApartmentForm
            onSubmit={handleAddApartment}
            defaultValues={editingApartment ? {
              name: editingApartment.title,
              unitType: editingApartment.unitTypes,
              status: editingApartment.status,
              location: editingApartment.address || "Unknown",
              waterUnitCost: 250,
            } : undefined}
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
