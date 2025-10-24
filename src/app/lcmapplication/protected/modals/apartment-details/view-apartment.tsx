"use client";

import React, { useEffect, useState } from "react";
import {
  Dropdown,
  Menu,
  Modal,
  message,
  Button,
  Tag,
  Space,
  Table,
  Form,
  Input,
  Select,
  Tooltip,
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
import { addUnitsService } from "@/apiActions/tenantsApis/services/units/add.unit.service";
import { ApartmentUnits } from "@/app/lcmapplication/types/invoice";
import { fetchUnitSevice } from "@/apiActions/tenantsApis/services/units/fetchUnits.service";
import { updatedUnitService } from "@/apiActions/tenantsApis/services/units/update.uint.service";
import { useRouter } from "next/navigation";


const { Option } = Select;


interface ApartmentDetailsProps {
  apartmentName: string;
  unitTypes: string[];
  address: string;
  apartmentId: String;
}

const ApartmentDetails: React.FC<ApartmentDetailsProps> = ({
  apartmentName,
  unitTypes,
  address,
  apartmentId,
}) => {
  const [units, setUnits] = useState<ApartmentUnits[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingUnit, setEditingUnit] = useState<ApartmentUnits | null>(null);

  const unitsPerPage = 10;
  const totalPages = Math.ceil(units.length / unitsPerPage);
  const currentUnits = units.slice(
    (currentPage - 1) * unitsPerPage,
    currentPage * unitsPerPage
  );



  const router= useRouter()

useEffect( ()=>{
  
  const response = async ()=>{
    const data = await fetchUnitSevice(apartmentId.toString());
    setUnits(data);
  }
  response();

}, [apartmentId])

console.log(units)

  const columns = [
  {
    title: "Unit Code",
    dataIndex: "unitCode",
    key: "unitCode",
  },
  {
    title: "Type",
    dataIndex: "unitType",
    key: "unitType",
  },
  {
    title: "Floor",
    dataIndex: "floor",
    key: "floor",
    render: (floor: string) => floor || "-",
  },
  {
    title: "Rent (KSh)",
    dataIndex: "monthlyRent",
    key: "monthlyRent",
    render: (rent: string) => rent || "-",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <Tag color={status === "OCCUPIED" ? "green" : status === "VACANT" ? "orange" : "blue"}>
        {status}
      </Tag>
    ),
  },
  {
    title: "Created",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (date: string) => (date ? new Date(date).toLocaleDateString() : "-"),
  },
  {
    title: "Updated",
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (date: string) => (date ? new Date(date).toLocaleDateString() : "-"),
  },
  {
    title: "Actions",
    key: "actions",
    render: (_: any, unit: ApartmentUnits) => (
      <Space>
        <Tooltip title="Edit">
          <Button type="link" icon={<EditOutlined />} onClick={() => openEditModal(unit)} />
        </Tooltip>
        <Tooltip title="Delete">
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteUnit(unit.unitCode)}
          />
        </Tooltip>
      </Space>
    ),
  },
];


  // --- Image Menu ---
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

  // --- Unit CRUD ---
  const openAddUnitModal = () => setIsAddModalVisible(true);
  const openEditModal = (unit: ApartmentUnits) => {
    setEditingUnit(unit);
    setIsEditModalVisible(true);
    
  };

  const handleDeleteUnit = (unitCode: string) => {
    setUnits((prev) => prev.filter((u) => u.unitCode !== unitCode));
    message.success(`Unit ${unitCode} deleted`);
  };

  const onAddUnitFinish = async (values: ApartmentUnits) => {
    const data ={
      ...values,
      apartmentId:Number(apartmentId)
    }
    await addUnitsService(data)

    router.refresh()
  
    message.success(`Unit ${values.unitCode} added`);
    setIsAddModalVisible(false);
    setCurrentPage(totalPages + 1);
  };



  const onEditUnitFinish = async (values: Partial<ApartmentUnits>) => {

     const data ={
      ...values,
      apartmentId:Number(apartmentId)
    }

    
    if (!editingUnit) return;


   await updatedUnitService(data, editingUnit.id!)

 

    
    message.success(`Unit ${editingUnit.unitCode} updated`);
    setIsEditModalVisible(false);

     router.refresh();
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

  



      {/* === Modals === */}
      <Modal
        title="Add New Unit"
        open={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form layout="vertical" onFinish={onAddUnitFinish}>
          <Form.Item label="Unit Code" name="unitCode" rules={[{ required: true }]}>
            <Input placeholder="e.g. B01" />
          </Form.Item>

          <Form.Item label="Unit Type" name="unitType" rules={[{ required: true }]}>
            <Select placeholder="Select unit type">
              <Option value="Studio">Studio</Option>
              <Option value="1 Bedroom">1 Bedroom</Option>
              <Option value="2 Bedroom">2 Bedroom</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Floor" name="floor">
            <Input placeholder="e.g. 2nd Floor" />
          </Form.Item>

          <Form.Item label="Monthly Rent (KSh)" name="monthlyRent">
            <Input placeholder="e.g. 40000" />
          </Form.Item>

          <Form.Item label="Status" name="status" rules={[{ required: true }]}>
            <Select placeholder="Select status">
              <Option value="OCCUPIED">Occupied</Option>
              <Option value="VACANT">Vacant</Option>
              <Option value="UNDER_MAINTENANCE">Under Maintenance</Option>
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Add Unit
          </Button>
        </Form>
      </Modal>

      <Modal
        title={`Edit Unit ${editingUnit?.unitCode}`}
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          layout="vertical"
          onFinish={onEditUnitFinish}
          initialValues={editingUnit || {}}
        >
             <Form.Item label="Unit Code" name="unitCode" rules={[{ required: true }]}>
            <Input placeholder="e.g. B01" />
          </Form.Item>
          
          <Form.Item label="Unit Type" name="unitType">
            <Select>
              <Option value="Studio">Studio</Option>
              <Option value="1 Bedroom">1 Bedroom</Option>
              <Option value="2 Bedroom">2 Bedroom</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Floor" name="floor">
            <Input />
          </Form.Item>

          <Form.Item label="Monthly Rent (KSh)" name="monthlyRent">
            <Input />
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Select>
              <Option value="OCCUPIED">OCCUPIED</Option>
              <Option value="VACANT">Vacant</Option>
              <Option value="UNDER_MAINTENANCE">Under Maintenance</Option>
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Save Changes
          </Button>
        </Form>
      </Modal>

          {/* === Units Table === */}
     <div className="table-wrapper">
  <Table
    dataSource={units}
    columns={columns}
    rowKey="unitCode"
    pagination={{
      current: currentPage,
      pageSize: 10,
      total: units.length,
      onChange: (page) => setCurrentPage(page),
    }}
    summary={() => (
      <Table.Summary.Row>
        <Table.Summary.Cell index={0} colSpan={7}>
          Total Units
        </Table.Summary.Cell>
        <Table.Summary.Cell index={1}>{units.length}</Table.Summary.Cell>
      </Table.Summary.Row>
    )}
  />
</div>
    </div>
  );
};

export default ApartmentDetails;
