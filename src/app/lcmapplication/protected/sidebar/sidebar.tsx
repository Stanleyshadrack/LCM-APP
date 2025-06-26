'use client';

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageOutlined, UserOutlined, TeamOutlined } from "@ant-design/icons";
import { Modal, Tabs } from "antd";

import "./sidebar.css";
import MessagingInterface from "../../chats/messages/messages";

interface SidebarProps {
  isVisible: boolean;
}

const { TabPane } = Tabs;

const Sidebar: React.FC<SidebarProps> = ({ isVisible }) => {
  const pathname = usePathname();
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <div className={`sidebar ${isVisible ? "show" : "hidden"}`}>
        <div className="logo">
          <img src="/lcmicon.SVG" alt="LCM Logo" />
          <span className="logo-text">L.C.M</span>
        </div>

        <nav className="nav-links">
          <Link href="/meterReading" className={pathname === "/employee" ? "active": ""}>
          Meter Reading
          </Link>
          <Link href="/dashboard/owner" className={pathname === "/owner" ? "active" : ""}>
            Dashboard
          </Link>
          <Link href="/apartments" className={pathname === "/apartments" ? "active" : ""}>
            Apartments
          </Link>
          <Link href="/tenants" className={pathname === "/tenants" ? "active" : ""}>
            Tenants
          </Link>
          <Link href="/invoices" className={pathname === "/invoices" ? "active" : ""}>
            Invoices
          </Link>
          <Link href="/payments" className={pathname === "/payments" ? "active" : ""}>
            Payment History
          </Link>
          <Link href="/arrears" className={pathname === "/arrears" ? "active" : ""}>
            Arrears
          </Link>
          <Link href="/meter-readings" className={pathname === "/meter-readings" ? "active" : ""}>
            Meter Readings
          </Link>
        </nav>

        {/* Messaging Icon */}
        <div className="bottom-icon" onClick={() => setIsModalVisible(true)}>
          <MessageOutlined style={{ fontSize: "24px", color: "#1890ff", cursor: "pointer" }} />
        </div>
      </div>

      {/* Messages Modal */}
      <Modal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        title={null}
        width={800}
        closeIcon={null}
      >
{<MessagingInterface/>}
      </Modal>
    </>
  );
};

export default Sidebar;
