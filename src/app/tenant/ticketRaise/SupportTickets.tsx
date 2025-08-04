"use client";

import React, { useState } from "react";
import { message, Tag } from "antd";
import {
  FormOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import styles from "./SupportTickets.module.css";

const SupportTickets = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!subject.trim() || !description.trim()) {
      message.error("Please fill in both the subject and description.");
      return;
    }

    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success("Support ticket submitted successfully!");
      setSubject("");
      setDescription("");
    } catch (error) {
      message.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const existingTickets = [
    {
      title: "Water Leak - Ticket #1234",
      status: "Resolved",
      response: "Maintenance team visited and fixed the issue.",
    },
    {
      title: "No Electricity - Ticket #1235",
      status: "In Progress",
      response: "Technician assigned. Visit scheduled for tomorrow.",
    },
  ];

  const getStatusTag = (status: string) => {
    switch (status) {
      case "Resolved":
        return <Tag icon={<CheckCircleOutlined />} color="success">Resolved</Tag>;
      case "In Progress":
        return <Tag icon={<ClockCircleOutlined />} color="processing">In Progress</Tag>;
      default:
        return <Tag color="default">{status}</Tag>;
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <FormOutlined style={{ marginRight: 8 }} /> Submit a Support Ticket
      </h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Subject:
          <input
            className={styles.input}
            type="text"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </label>

        <label className={styles.label}>
          Description:
          <textarea
            className={styles.textarea}
            placeholder="Describe your issue..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Ticket"}
        </button>
      </form>

      <div className={styles.responseSection}>
        <h2 className={styles.subtitle}>Your Ticket Responses</h2>
        <div className={styles.ticketList}>
          {existingTickets.map((ticket, index) => (
            <div
              key={index}
              className={styles.ticket}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3>{ticket.title}</h3>
              {getStatusTag(ticket.status)}
              <p><strong>Response:</strong> {ticket.response}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportTickets;
