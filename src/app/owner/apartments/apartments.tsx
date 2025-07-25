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
      unitTypes: ["1BR", "2BR", "Studio"],
      status: ApartmentStatus.Letting,
    },
    {
      id: 2,
      title: "Silver Towers",
      unitTypes: ["2BR", "3BR"],
      status: ApartmentStatus.UnderConstruction,
    },
    {
      id: 3,
      title: "Sunset Apartments",
      unitTypes: ["Studio", "1BR"],
      status: ApartmentStatus.Letting,
    },
    {
      id: 4,
      title: "Palm Residency",
      unitTypes: ["2BR", "3BR", "4BR"],
      status: ApartmentStatus.SoldOut,
    },
    {
      id: 5,
      title: "Royal Villas",
      unitTypes: ["3BR", "4BR"],
      status: ApartmentStatus.Letting,
    },
    {
      id: 6,
      title: "Ocean View",
      unitTypes: ["1BR", "Studio"],
      status: ApartmentStatus.SoldOut,
    },
    {
      id: 7,
      title: "Maple Grove",
      unitTypes: ["2BR", "3BR"],
      status: ApartmentStatus.Letting,
    },
    {
      id: 8,
      title: "Hilltop Haven",
      unitTypes: ["Studio"],
      status: ApartmentStatus.UnderConstruction,
    },
    {
      id: 9,
      title: "Westwood Heights",
      unitTypes: ["1BR", "2BR"],
      status: ApartmentStatus.Letting,
    },
    {
      id: 10,
      title: "Urban Oasis",
      unitTypes: ["Studio", "1BR", "2BR"],
      status: ApartmentStatus.Letting,
    },
  ]);

  const handleAddApartment = (data: {
    name: string;
    unitType: string[];
    status: ApartmentStatus;
    location: string;
    waterUnitCost: number;
  }) => {
    if (editMode && editingApartment) {
      setApartments((prev) =>
        prev.map((apt) =>
          apt.id === editingApartment.id
            ? { ...apt, title: data.name, unitTypes: data.unitType, status: data.status }
            : apt
        )
      );
    } else {
      const newApartment: Apartment = {
        id: apartments.length + 1,
        title: data.name,
        unitTypes: data.unitType,
        status: data.status,
      };
      setApartments((prev) => [...prev, newApartment]);
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

  const handleDelete = (id: number) => {
    setApartments((prev) => prev.filter((apt) => apt.id !== id));
  };

  const columns: ColumnsType<Apartment> = [
    {
      title: "Apartment",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text: string) => (
        <span>
          <HomeOutlined style={{ marginRight: 8, color: "#1890ff" }} />
          {text}
        </span>
      ),
    },
    {
      title: "Units",
      dataIndex: "unitTypes",
      key: "unitTypes",
      sorter: (a, b) => a.unitTypes.length - b.unitTypes.length,
      render: (unitTypes: string[]) => (
        <Tooltip title={unitTypes.join(", ")}>
          <span>{unitTypes.length} Unit(s)</span>
        </Tooltip>
      ),
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
      onFilter: (value, record) =>
        typeof value === "string" ? record.status === value : false,
      render: (status: ApartmentStatus) => (
        <Tag
          color={
            status === "Letting"
              ? "blue"
              : status === "Under construction"
              ? "green"
              : "red"
          }
        >
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
            <Button
              type="link"
              icon={<EyeOutlined />}
              onClick={() => handleView(record)}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
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
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search apartments..."
          />
          <AddTenantButton
            onClick={() => {
              setIsModalOpen(true);
              setEditMode(false);
              setEditingApartment(null);
            }}
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
          pagination={{
            current: currentPage,
            pageSize: apartmentsPerPage,
            total: filteredApartments.length,
            onChange: (page) => setCurrentPage(page),
          }}
          className="apartments-table"
        />
      ) : (
        <div className="apartments-grid">
          {currentApartments.map(({ id, title, unitTypes, status }) => (
            <ApartmentCard
              key={id}
              title={title}
              unitTypes={unitTypes}
              status={status}
              address=""
            />
          ))}
        </div>
      )}

      <Modal
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
                    location: "Unknown",
                    waterUnitCost: 250,
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
        {hasMounted && viewingApartment && (
          <ApartmentDetails
            apartmentName={viewingApartment.title}
            unitTypes={viewingApartment.unitTypes}
            address="Kilimani, Nairobi"
          />
        )}
      </Modal>
    </div>
  );
};

export default Apartments;
