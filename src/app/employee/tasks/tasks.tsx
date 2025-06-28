"use client";

import React, { useState } from "react";
import "./tasks.css";
import {
  SearchOutlined,
  FilterOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  HourglassOutlined,
} from "@ant-design/icons";

const initialTasks = [
  { id: 1, title: "Inspect meter readings", status: "Pending", due: "Today" },
  { id: 2, title: "Update arrears list", status: "In Progress", due: "Tomorrow" },
  { id: 3, title: "Support ticket #453", status: "Completed", due: "Yesterday" },
  { id: 4, title: "Reconcile payments", status: "Pending", due: "Friday" },
];

const TasksPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = initialTasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <button className="filter-button">
          <FilterOutlined />
          Filter
        </button>
      </div>

      <div className="task-table">
        <div className="task-table-header">
          <span>Title</span>
          <span>Status</span>
          <span>Due</span>
        </div>

        {filteredTasks.map((task) => (
          <div key={task.id} className={`task-row ${task.status.toLowerCase().replace(" ", "-")}`}>
            <span>{task.title}</span>
            <span className={`badge ${task.status.toLowerCase().replace(" ", "-")}`}>
              {task.status}
            </span>
            <span>{task.due}</span>
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <div className="no-tasks">No tasks found.</div>
        )}
      </div>
    </div>
  );
};

export default TasksPage;

