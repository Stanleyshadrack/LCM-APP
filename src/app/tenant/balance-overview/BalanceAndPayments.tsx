"use client";

import React, { useEffect, useState } from "react";
import {
  DollarOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import {
  Timeline,
  Button,
  Select,
  Tag,
  Progress,
  Empty,
  Pagination,
  Modal,
} from "antd";
import styles from "./BalanceAndPayments.module.css";

const BalanceAndPayments = () => {
  const [displayedAmount, setDisplayedAmount] = useState(0);
  const [months, setMonths] = useState(3);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalContent, setModalContent] = useState<string | null>(null);

  const actualAmount = 4250;
  const pageSize = 1;

  useEffect(() => {
    let start = 0;
    const duration = 800;
    const increment = actualAmount / (duration / 16);

    const animate = () => {
      start += increment;
      if (start < actualAmount) {
        setDisplayedAmount(Math.floor(start));
        requestAnimationFrame(animate);
      } else {
        setDisplayedAmount(actualAmount);
      }
    };

    animate();
  }, []);

  const timelineTransactions = [
    {
      label: "June 2025",
      content: "Paid rent - KES 4,250",
      status: "success",
      method: "M-Pesa",
      receiptUrl: "/receipts/june-2025.pdf",
    },
    {
      label: "May 2025",
      content: "Paid rent - KES 4,250",
      status: "success",
      method: "Bank",
      receiptUrl: "/receipts/may-2025.pdf",
    },
    {
      label: "April 2025",
      content: "Late rent - KES 4,250",
      status: "late",
      method: "Cash",
      receiptUrl: "/receipts/april-2025.pdf",
    },
    {
      label: "March 2025",
      content: "Unpaid rent - KES 4,250",
      status: "unpaid",
      method: null,
      receiptUrl: null,
    },
  ];

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
      items: [{ label: "May Rent", amount: 4250, paid: true }],
    },
  ];

  const filteredPayments = allPayments
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => {
        if (filter === "paid") return item.paid;
        if (filter === "unpaid") return !item.paid;
        return true;
      }),
    }))
    .filter((group) => group.items.length > 0);

  const paginatedGroups = filteredPayments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const openReceipt = (item: { label: string; amount?: number; paid: boolean }) => {
    setModalContent(`This is a preview of the receipt for: ${item.label}`);
  };

  const getIconByStatus = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircleOutlined style={{ fontSize: "16px", color: "#52c41a" }} />;
      case "late":
        return <ExclamationCircleOutlined style={{ fontSize: "16px", color: "#faad14" }} />;
      case "unpaid":
        return <CloseCircleOutlined style={{ fontSize: "16px", color: "#f5222d" }} />;
      default:
        return <CheckCircleOutlined style={{ fontSize: "16px" }} />;
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Balance & Payment Overview</h1>

      <div className={styles.card}>
        <div className={styles.item}>
          <DollarOutlined className={styles.icon} />
          <div>
            <p>Outstanding Balance</p>
            <h2 className={styles.amount}>KES {displayedAmount.toLocaleString()}</h2>
          </div>
        </div>
        <div className={styles.item}>
          <CalendarOutlined className={styles.icon} />
          <div>
            <p>Next Payment Due</p>
            <h3 className={styles.dueDate}>5th July, 2025</h3>
          </div>
        </div>
        <Button
  type="primary"
  size="large"
  className={styles.payButton}
  onClick={() =>
    Modal.info({
      title: "Pay with M-Pesa",
      content: (
        <div>
          <p><strong>Paybill Number:</strong> 522522</p>
          <p><strong>Account Number:</strong> 167247</p>
          <p><strong>Amount:</strong> KES {displayedAmount.toLocaleString()}</p>
          <p>1. Go to your M-Pesa Menu.</p>
          <p>2. Select <em>Lipa na M-Pesa</em> → <em>Paybill</em>.</p>
          <p>3. Enter Business Number <strong>522522</strong>.</p>
          <p>4. Enter Account Number <strong>167247</strong>.</p>
          <p>5. Enter the amount and confirm with your PIN.</p>
        </div>
      ),
      okText: "Done",
    })
  }
>
  Make Payment
</Button>

      </div>

      <div className={styles.progressSection}>
        <h4>Rent Payment Progress</h4>
        <Progress type="circle" percent={72} strokeColor="#52c41a" />
      </div>

      <div className={styles.timelineSection}>
        <div className={styles.timelineHeader}>
          <h3 className={styles.timelineTitle}>Payment History</h3>
          <Select
            defaultValue={3}
            onChange={setMonths}
            size="small"
            className={styles.monthFilter}
            options={[
              { value: 3, label: "Last 3 Months" },
              { value: 6, label: "Last 6 Months" },
              { value: 12, label: "Last 12 Months" },
            ]}
          />
        </div>

        <Timeline
          mode="left"
          items={timelineTransactions.slice(0, months).map((t) => ({
            label: t.label,
            dot: getIconByStatus(t.status),
            children: (
              <div className={`${styles.timelineItem} ${styles.animateIn}`}>
                <div className={styles.transactionContent}>
                  <p
                    className={
                      t.status === "late"
                        ? styles.late
                        : t.status === "unpaid"
                        ? styles.unpaid
                        : styles.success
                    }
                  >
                    {t.content}
                  </p>
                  {t.method && (
                    <Tag
                      color={
                        t.method === "M-Pesa"
                          ? "green"
                          : t.method === "Bank"
                          ? "blue"
                          : "orange"
                      }
                    >
                      {t.method}
                    </Tag>
                  )}
                  {t.receiptUrl && (
                    <Button
                      size="small"
                      type="link"
                      href={t.receiptUrl}
                      download
                      className={styles.downloadBtn}
                    >
                      Download Receipt
                    </Button>
                  )}
                </div>
              </div>
            ),
          }))}
        />
      </div>

      <div className={styles.filterContainer}>
        <Select value={filter} onChange={setFilter} size="small">
          <Select.Option value="all">All</Select.Option>
          <Select.Option value="paid">Paid</Select.Option>
          <Select.Option value="unpaid">Unpaid</Select.Option>
        </Select>
      </div>

      {filteredPayments.length === 0 ? (
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
            total={filteredPayments.length}
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

export default BalanceAndPayments;
