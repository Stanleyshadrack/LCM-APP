"use client";

import { useState } from "react";
import {
  Table,
  Tag,
  Button,
  Tooltip,
  Input,
  Drawer,
  Form,
  Select,
  message,
  Space,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "./ticket.css";

type Ticket = {
  id: number;
  subject: string;
  priority: "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Closed";
  createdAt: string;
};

const initialTickets: Ticket[] = [
  {
    id: 101,
    subject: "Power outage in Unit B02",
    priority: "High",
    status: "Open",
    createdAt: "2025-06-25T10:00:00",
  },
  {
    id: 102,
    subject: "Blocked sink in common kitchen",
    priority: "Medium",
    status: "In Progress",
    createdAt: "2025-06-24T14:30:00",
  },
  {
    id: 103,
    subject: "Light flickering in hallway",
    priority: "Low",
    status: "Closed",
    createdAt: "2025-06-23T09:20:00",
  },
];

const Tickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTickets = tickets.filter((t) =>
    t.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFormSubmit = (values: any) => {
    if (editingTicket) {
      const updatedTickets = tickets.map((t) =>
        t.id === editingTicket.id ? { ...t, ...values } : t
      );
      setTickets(updatedTickets);
      message.success("Ticket updated successfully");
    } else {
      const newTicket: Ticket = {
        id: Math.floor(Math.random() * 10000),
        subject: values.subject,
        priority: values.priority,
        status: "Open",
        createdAt: new Date().toISOString(),
      };
      setTickets([newTicket, ...tickets]);
      message.success("Ticket created successfully");
    }

    setDrawerVisible(false);
    setEditingTicket(null);
    form.resetFields();
  };

  const handleEdit = (ticket: Ticket) => {
    form.setFieldsValue(ticket);
    setEditingTicket(ticket);
    setDrawerVisible(true);
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this ticket?"
    );
    if (confirmDelete) {
      setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
      message.success("Ticket deleted");
    }
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
    setEditingTicket(null);
    form.resetFields();
  };

  const columns = [
    {
      title: "Ticket #",
      dataIndex: "id",
      width: 90,
    },
    {
      title: "Subject",
      dataIndex: "subject",
      render: (text: string) => (
        <Tooltip title={text}>
          <span className="ticket-ellipsis">{text}</span>
        </Tooltip>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      render: (p: Ticket["priority"]) => {
        const color = p === "High" ? "red" : p === "Medium" ? "orange" : "blue";
        return <Tag color={color}>{p}</Tag>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (s: Ticket["status"]) => {
        const color =
          s === "Open" ? "green" : s === "In Progress" ? "gold" : "gray";
        return <Tag color={color}>{s}</Tag>;
      },
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (d: string) => new Date(d).toLocaleString(),
      sorter: (a: Ticket, b: Ticket) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Action",
      render: (_: any, record: Ticket) => (
        <Space>
          <Tooltip title="Edit Ticket">
            <Button
              icon={<EditOutlined />}
              type="link"
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Delete Ticket">
            <Button
              icon={<DeleteOutlined />}
              type="link"
              danger
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
   <div className="ticket-dashboard">
  <div className="ticket-header">
    <h2>Support Tickets</h2>
  </div>

  {/* Right-aligned search + button */}
  <div className="actions-div">
    <Input
      prefix={<SearchOutlined />}
      placeholder="Search subject..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="ticket-search"
    />
    <Button
      type="primary"
      icon={<PlusOutlined />}
      onClick={() => {
        setDrawerVisible(true);
        form.resetFields();
        setEditingTicket(null);
      }}
    >
      New Ticket
    </Button>
  </div>

  {/* Table */}
  <Table
    dataSource={filteredTickets}
    columns={columns}
    rowKey={(record) => record.id}
    pagination={{ pageSize: 5 }}
    className="tickets-table"
    locale={{ emptyText: "No tickets found." }}
  />

  {/* Drawer */}
  <Drawer
    title={editingTicket ? "Edit Ticket" : "Create New Ticket"}
    open={drawerVisible}
    onClose={handleDrawerClose}
    width={420}
  >
    <Form layout="vertical" form={form} onFinish={handleFormSubmit}>
      <Form.Item
        label="Subject"
        name="subject"
        rules={[{ required: true, message: "Please enter a subject" }]}
      >
        <Input placeholder="e.g. Light not working in lobby" />
      </Form.Item>

      <Form.Item
        label="Priority"
        name="priority"
        rules={[{ required: true, message: "Select a priority" }]}
      >
        <Select placeholder="Select priority">
          <Select.Option value="High">High</Select.Option>
          <Select.Option value="Medium">Medium</Select.Option>
          <Select.Option value="Low">Low</Select.Option>
        </Select>
      </Form.Item>

      <Button type="primary" htmlType="submit" block>
        {editingTicket ? "Update Ticket" : "Submit Ticket"}
      </Button>
    </Form>
  </Drawer>
</div>

  );
};

export default Tickets;
