"use client";

import React, { useState } from "react";
import {
  Dropdown,
  Menu,
  Modal,
  message,
  Button,
  Tag,
  Form,
  Input,
  Select,
} from "antd";
import {
  HomeOutlined,
  UploadOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
} from "@ant-design/icons";

import "./view-apartment.css";

const { Option } = Select;

interface ApartmentDetailsProps {
  apartmentName: string;
  unitTypes: string[];
  address: string;
}

const ApartmentDetails: React.FC<ApartmentDetailsProps> = ({
  apartmentName,
  unitTypes,
  address,
}) => {
  const [units, setUnits] = useState([
    { unit: "B01", bedroom: "1 Bedroom", status: "Occupied" },
    { unit: "B02", bedroom: "2 Bedrooms", status: "Vacated" },
    { unit: "B03", bedroom: "Studio", status: "Occupied" },
    { unit: "C06", bedroom: "Studio", status: "Occupied" },
  ]);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingUnit, setEditingUnit] = useState<null | {
    unit: string;
    bedroom: string;
    status: string;
  }>(null);

  const unitsPerPage = 10;
  const totalPages = Math.ceil(units.length / unitsPerPage);
  const currentUnits = units.slice(
    (currentPage - 1) * unitsPerPage,
    currentPage * unitsPerPage
  );

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "view" && imageUrl) setIsImageModalVisible(true);
    else if (key === "upload" || key === "edit")
      document.getElementById("imageUploadInput")?.click();
    else if (key === "remove") {
      setImageUrl(null);
      message.success("Image removed");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
        message.success("Image uploaded");
      };
      reader.readAsDataURL(file);
    }
  };

  const openAddUnitModal = () => setIsAddModalVisible(true);
  const openEditModal = (unitData: typeof units[0]) => {
    setEditingUnit(unitData);
    setIsEditModalVisible(true);
  };

  const onAddUnitFinish = (values: typeof units[0]) => {
    setUnits([...units, values]);
    message.success(`Unit ${values.unit} added`);
    setIsAddModalVisible(false);
    setCurrentPage(totalPages);
  };

  const onEditUnitFinish = (values: { bedroom: string; status: string }) => {
    if (!editingUnit) return;
    setUnits((prev) =>
      prev.map((u) =>
        u.unit === editingUnit.unit ? { ...u, ...values } : u
      )
    );
    message.success(`Unit ${editingUnit.unit} updated`);
    setIsEditModalVisible(false);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="view" icon={<EyeOutlined />} disabled={!imageUrl}>
        View Image
      </Menu.Item>
      <Menu.Item key="upload" icon={<UploadOutlined />}>
        Upload Image
      </Menu.Item>
      <Menu.Item key="edit" icon={<EditOutlined />} disabled={!imageUrl}>
        Replace Image
      </Menu.Item>
      <Menu.Item key="remove" icon={<DeleteOutlined />} danger disabled={!imageUrl}>
        Remove Image
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="apartment-modal">
      <div className="modal-header">
        <div className="header-left">
          <h1>{apartmentName}</h1>
          <p className="unit-types">{unitTypes.join(" • ")}</p>
          <Button type="primary" onClick={openAddUnitModal} style={{ marginBottom: "1rem" }}>
            + Add Unit
          </Button>
        </div>

        <div className="header-right">
          <div className="apartment-image">
            {imageUrl ? (
              <img src={imageUrl} alt="Apartment" />
            ) : (
              <HomeOutlined style={{ fontSize: 48, color: "#999" }} />
            )}
            <Dropdown overlay={menu} trigger={["click"]}>
              <Button icon={<MoreOutlined />} size="small" />
            </Dropdown>
            <input
              id="imageUploadInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </div>

          <div className="location-info">
            <p className="company">LCM, Inc</p>
            <p>{address}</p>
          </div>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Unit</th>
              <th>Unit Type</th>
              <th>Status</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {currentUnits.map((item, index) => (
              <tr key={index}>
                <td>{item.unit}</td>
                <td>{item.bedroom}</td>
                <td>
                  <Tag color={item.status === "Occupied" ? "green" : "orange"}>
                    {item.status}
                  </Tag>
                </td>
                <td>
                  <Button
                    type="link"
                    size="small"
                    onClick={() => openEditModal(item)}
                    style={{
                      padding: 0,
                      fontWeight: "bold",
                      fontSize: 12,
                      color: "#1890ff",
                      textDecoration: "underline",
                    }}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
            <tr className="total-row">
              <td colSpan={3}>Total Units</td>
              <td className="total-count">{units.length}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="pagination-controls">
        <button onClick={() => setCurrentPage((p) => p - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`pagination-btn ${currentPage === i + 1 ? "active" : ""}`}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => setCurrentPage((p) => p + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      <footer className="modal-footer">
        <p>
          www.website.com &nbsp; | &nbsp; +91 00000 00000 &nbsp; | &nbsp;
          hello@email.com
        </p>
      </footer>

      {/* Modals: Image, Add, Edit */}
      <Modal
        title="Apartment Image"
        open={isImageModalVisible}
        footer={null}
        onCancel={() => setIsImageModalVisible(false)}
      >
        <img src={imageUrl!} alt="Apartment" style={{ width: "100%" }} />
      </Modal>

      <Modal
        title="Add New Unit"
        open={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form layout="vertical" onFinish={onAddUnitFinish}>
          <Form.Item
            label="Unit Name"
            name="unit"
            rules={[
              { required: true, message: "Please input the unit name!" },
              {
                validator: (_, value) => {
                  if (!value) return Promise.resolve();
                  const exists = units.some((u) => u.unit.toLowerCase() === value.toLowerCase());
                  return exists
                    ? Promise.reject(new Error("This Unit ID already exists!"))
                    : Promise.resolve();
                },
              },
            ]}
          >
            <Input placeholder="e.g. B04" />
          </Form.Item>

          <Form.Item
            label="Unit Type"
            name="bedroom"
            rules={[{ required: true, message: "Please select unit type!" }]}
            initialValue="Studio"
          >
            <Select>
              <Option value="Studio">Studio</Option>
              <Option value="1 Bedroom">1 Bedroom</Option>
              <Option value="2 Bedrooms">2 Bedrooms</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select status!" }]}
            initialValue="Vacated"
          >
            <Select>
              <Option value="Occupied">Occupied</Option>
              <Option value="Vacated">Vacated</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Add Unit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={`Edit Unit ${editingUnit?.unit}`}
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          layout="vertical"
          onFinish={onEditUnitFinish}
          initialValues={{
            bedroom: editingUnit?.bedroom,
            status: editingUnit?.status,
          }}
        >
          <Form.Item
            label="Unit Type"
            name="bedroom"
            rules={[{ required: true, message: "Please select unit type!" }]}
          >
            <Select>
              <Option value="Studio">Studio</Option>
              <Option value="1 Bedroom">1 Bedroom</Option>
              <Option value="2 Bedrooms">2 Bedrooms</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select status!" }]}
          >
            <Select>
              <Option value="Occupied">Occupied</Option>
              <Option value="Vacated">Vacated</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ApartmentDetails;
