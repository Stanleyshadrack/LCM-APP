"use client";

import React, { useState } from "react";
import {
  Table,
  Input,
  Button,
  Tag,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Key } from "react";
import {
  SearchOutlined,
  FilterOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  HourglassOutlined,
} from "@ant-design/icons";
import "./tasks.css";

interface Task {
  key: number;
  id: number;
  title: string;
  status: "Pending" | "In Progress" | "Completed";
  due: string;
}

const initialTasks: Task[] = [
  { id: 1, key: 1, title: "Inspect meter readings", status: "Pending", due: "Today" },
  { id: 2, key: 2, title: "Update arrears list", status: "In Progress", due: "Tomorrow" },
  { id: 3, key: 3, title: "Support ticket #453", status: "Completed", due: "Yesterday" },
  { id: 4, key: 4, title: "Reconcile payments", status: "Pending", due: "Friday" },
];

const statusColors: Record<Task["status"], string> = {
  "Pending": "#f39c12",
  "In Progress": "#3498db",
  "Completed": "#2ecc71",
};

const TasksPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = initialTasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: ColumnsType<Task> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Pending", value: "Pending" },
        { text: "In Progress", value: "In Progress" },
        { text: "Completed", value: "Completed" },
      ],
      onFilter: (value: Key | boolean, record) => record.status === value,
      render: (status: Task["status"]) => (
        <Tag color={statusColors[status]} style={{ color: "#fff" }}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Due",
      dataIndex: "due",
      key: "due",
      sorter: (a, b) => a.due.localeCompare(b.due),
    },
  ];

  return (
    <div className="tasks-page">
      <h1 className="tasks-heading">Employee Task Center</h1>

      <div className="tasks-summary-cards">
        <div className="card pending">
          <HourglassOutlined />
          <span>Pending</span>
          <strong>2</strong>
        </div>
        <div className="card progress">
          <ClockCircleOutlined />
          <span>In Progress</span>
          <strong>1</strong>
        </div>
        <div className="card completed">
          <CheckCircleOutlined />
          <span>Completed</span>
          <strong>1</strong>
        </div>
      </div>

      <div className="task-search-filter">
        <div className="search-bar">
          <SearchOutlined />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button className="filter-button" icon={<FilterOutlined />}>
          Filter
        </Button>
      </div>

      <div className="task-table">
        <Table
          columns={columns}
          dataSource={filteredTasks}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
};

export default TasksPage;
