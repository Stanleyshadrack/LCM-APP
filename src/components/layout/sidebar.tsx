"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import MessagingInterface from "@/app/chats/messages/messages";
import "./sidebar.css";

interface SidebarProps {
  isVisible: boolean;
  isMobile?: boolean;
  onClose?: () => void;
  role: "owner" | "employee" | "tenant"; // Required for role-based links
}

const Sidebar: React.FC<SidebarProps> = ({
  isVisible,
  isMobile = false,
  onClose,
  role,
}) => {
  const pathname = usePathname();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOverlayClick = () => {
    if (onClose) onClose();
  };

  const roleLinks: Record<string, { path: string; label: string }[]> = {
owner: [
  { path: "/owner/dashboard", label: "Dashboard" },
  { path: "/owner/apartments", label: "Apartments" },
  { path: "/shared/tenants", label: "Tenants" },
  { path: "/shared/meter-readings", label: "Meter Readings" },
  { path: "/shared/invoices", label: "Invoices" },
  { path: "/owner/payments", label: "Payments" },
  { path: "/owner/arrears", label: "Arrears" },
],


    employee: [
      { path: "/employee/dashboard", label: "Dashboard" },
      { path: "/employee/tasks", label: "Tasks" },
      { path: "/shared/meter-readings", label: "Meter Records" },
      { path: "/employee/readings", label: "Meter Readings" },
      { path: "/employee/support-ticket", label: "Support Tickets" },
    ],
    tenant: [
      { path: "/tenant/dashboard", label: "My Dashboard" },
      { path: "/tenant/my-readings", label: "My Meter Readings" },
      { path: "/tenant/my-payments", label: "My Payments" },
      { path: "/tenant/support", label: "Support" },
    ],
  };

  const linksToRender = roleLinks[role] || [];

  return (
    <>
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
          {linksToRender.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={pathname === link.path ? "active" : ""}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="bottom-icon" onClick={() => setIsModalVisible(true)}>
          <MessageOutlined
            style={{ fontSize: "24px", color: "#1890ff", cursor: "pointer" }}
          />
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
        <MessagingInterface />
      </Modal>
    </>
  );
};

export default Sidebar;
