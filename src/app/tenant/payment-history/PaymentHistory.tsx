"use client";

import React, { useState } from "react";
import { Select, Tag, Button, Empty, Pagination, Modal } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
import styles from "./PaymentHistory.module.css";

const { Option } = Select;

const PaymentHistory = () => {
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
const [modalContent, setModalContent] = useState<string | null>(null);



  const pageSize = 1;

  const allPayments = [
    {
      month: "June 2025",
      items: [
        { label: "June Rent", amount: 4250, paid: true },
        { label: "Water Bill", paid: false },
      ],
    },
    {
      month: "May 2025",
      items: [
        { label: "May Rent", amount: 4250, paid: true },
      ],
    },
  ];

  const filtered = allPayments
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => {
        if (filter === "paid") return item.paid;
        if (filter === "unpaid") return !item.paid;
        return true;
      }),
    }))
    .filter((group) => group.items.length > 0);

  const paginatedGroups = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const openReceipt = (item: { label: string; amount: number; paid: boolean; } | { label: string; paid: boolean; amount?: undefined; }) => {
    setModalContent(`This is a preview of the receipt for: ${item.label}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Payment History</h1>

      <div className={styles.filterContainer}>
        <Select value={filter} onChange={setFilter} size="small">
          <Option value="all">All</Option>
          <Option value="paid">Paid</Option>
          <Option value="unpaid">Unpaid</Option>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <Empty description="No payments yet" />
      ) : (
        <>
          <ul className={styles.list}>
            {paginatedGroups.map((group, groupIndex) => (
              <li key={groupIndex}>
                <h4 className={styles.groupTitle}>{group.month}</h4>
                {group.items.map((item, index) => (
                  <div className={styles.listItem} key={index}>
                    <span className={styles.label}>{item.label}</span>
                    <div className={styles.details}>
                      <Tag color={item.paid ? "green" : "red"}>
                        {item.paid ? "Paid" : "Unpaid"}
                      </Tag>
                      {item.amount && (
                        <span
                          className={item.paid ? styles.amount : styles.pending}
                        >
                          KES {item.amount.toLocaleString()}
                        </span>
                      )}
                      {item.paid && (
                        <Button
                          type="link"
                          icon={<FilePdfOutlined />}
                          size="small"
                          onClick={() => openReceipt(item)}
                        >
                          Receipt
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </li>
            ))}
          </ul>

          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filtered.length}
            onChange={(page) => setCurrentPage(page)}
            style={{ marginTop: "1.5rem", textAlign: "center" }}
          />

          <Modal
            open={!!modalContent}
            onCancel={() => setModalContent(null)}
            footer={null}
            title="Receipt Preview"
          >
            <p>{modalContent}</p>
          </Modal>
        </>
      )}
    </div>
  );
};

export default PaymentHistory;
