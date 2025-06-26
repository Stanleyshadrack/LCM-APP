'use client';

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import "./sidebar.css";

interface SidebarProps {
  isVisible: boolean;
  isMobile?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isVisible, isMobile = false, onClose }) => {
  const pathname = usePathname();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOverlayClick = () => {
    if (onClose) onClose();
  };

  return (
    <>
      {/* Overlay for mobile with fade animation */}
      {isMobile && (
        <div
          className={`sidebar-overlay ${isVisible ? "show" : "hidden"}`}
          onClick={handleOverlayClick}
        />
      )}

      <div className={`sidebar ${isVisible ? "show" : "hidden"}`}>
        <div className="logo">
          <img src="/lcmicon.SVG" alt="LCM Logo" />
          <span className="logo-text">L.C.M</span>
        </div>

        <nav className="nav-links">
          <Link href="/meterReading" className={pathname === "/meterReading" ? "active" : ""}>
            Meter Reading
          </Link>
          <Link href="/dashboard/owner" className={pathname === "/dashboard/owner" ? "active" : ""}>
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

        <div className="bottom-icon" onClick={() => setIsModalVisible(true)}>
          <MessageOutlined style={{ fontSize: "24px", color: "#1890ff", cursor: "pointer" }} />
        </div>
      </div>

      <Modal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        title={null}
        width={800}
        closeIcon={null}
      >
        {/* {<MessagingInterface/>} */}
      </Modal>
    </>
  );
};

export default Sidebar;
