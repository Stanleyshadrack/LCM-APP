import React, { useState } from "react";
import { Table, Button, Badge, Input, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "./tenants.css";

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

const data: Tenant[] = [
  { key: "1", name: "John Doe", email: "johndoe@gmail.com", idNumber: "12345678", phoneNumber: "254742792965", unit: "B02", dateCreated: "02/04/2024", status: "In Residence" },
  { key: "2", name: "Jane Smith", email: "janesmith@gmail.com", idNumber: "87654321", phoneNumber: "254700123456", unit: "C01", dateCreated: "03/04/2024", status: "Vacated" },
  { key: "3", name: "Jake Park", email: "jakepark@gmail.com", idNumber: "11223344", phoneNumber: "254711223344", unit: "D01", dateCreated: "04/04/2024", status: "Vacated" },
  { key: "4", name: "Amelia Brown", email: "ameliabrown@gmail.com", idNumber: "99887766", phoneNumber: "254722998877", unit: "A03", dateCreated: "05/04/2024", status: "In Residence" },
  { key: "5", name: "Chris Evans", email: "chrisevans@gmail.com", idNumber: "55667788", phoneNumber: "254733556677", unit: "E02", dateCreated: "06/04/2024", status: "Vacated" },
];

const TenantsTable: React.FC = () => {
  const [searchText, setSearchText] = useState("");

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "ID Number", dataIndex: "idNumber", key: "idNumber" },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Unit", dataIndex: "unit", key: "unit" },
    { title: "Date Created", dataIndex: "dateCreated", key: "dateCreated" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: Tenant["status"]) => (
        <Badge color={status === "In Residence" ? "green" : "orange"} text={status} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button icon={<EditOutlined />} type="link" />
          <Button icon={<DeleteOutlined />} type="link" danger />
        </Space>
      ),
    },
  ];

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="tenants-container">
    
      <div className="page-header">
        <h2>Tenants</h2>
        <div className="page-actions">
          <Input
            placeholder="Search by name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="search-input"
            style={{ width: 250 }}
          />
          <Button type="primary" className="add-tenant-button">
            + Add Tenant
          </Button>
        </div>
      </div>

      {/* Table */}
      
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 8 }}
          bordered
          rowClassName={() => "custom-table-row"}
        />
      </div>
   
  );
};

export default TenantsTable;
