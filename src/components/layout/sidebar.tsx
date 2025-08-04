"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Ant Design Icons
import {
  MessageOutlined,
  HomeOutlined,
  ApartmentOutlined,
  TeamOutlined,
  DashboardOutlined,
  FileTextOutlined,
  DollarCircleOutlined,
  AlertOutlined,
  CheckCircleOutlined,
  ReadOutlined,
  FundProjectionScreenOutlined,
  ScheduleOutlined,
  FileDoneOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

import "./sidebar.css";

interface SidebarProps {
  isVisible: boolean;
  isMobile?: boolean;
  onClose?: () => void;
  role: "owner" | "employee" | "tenant";
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

  const roleLinks: Record<string, { path: string; label: string; icon?: React.ReactNode }[]> = {
    owner: [
      { path: "/owner/dashboard", label: "Dashboard", icon: <DashboardOutlined /> },
      { path: "/owner/apartments", label: "Apartments", icon: <ApartmentOutlined /> },
      { path: "/shared/tenants", label: "Tenants", icon: <TeamOutlined /> },
      { path: "/shared/meter-readings", label: "Meter Readings", icon: <ReadOutlined /> },
      { path: "/shared/invoices", label: "Invoices", icon: <FileTextOutlined /> },
      { path: "/owner/payments", label: "Payments", icon: <DollarCircleOutlined /> },
      { path: "/shared/arrears", label: "Arrears", icon: <AlertOutlined /> },
      { path: "/shared/messages", label: "Talk", icon: <MessageOutlined /> },
    ],
    employee: [
      { path: "/employee/dashboard", label: "Dashboard", icon: <DashboardOutlined /> },
      { path: "/employee/tasks", label: "Tasks", icon: <CheckCircleOutlined /> },
      { path: "/shared/meter-readings", label: "Meter Records", icon: <ReadOutlined /> },
      { path: "/employee/readings", label: "Meter Readings", icon: <FundProjectionScreenOutlined /> },
      { path: "/employee/support-ticket", label: "Support Tickets", icon: <FileDoneOutlined /> },
      { path: "/shared/messages", label: "Talk", icon: <MessageOutlined /> },
    ],
    tenant: [
      { path: "/tenant/dashboard", label: "My Dashboard", icon: <DashboardOutlined /> },
      { path: "/tenant/meter-readings", label: "My Meter Readings", icon: <ReadOutlined /> },
      { path: "/tenant/balance-overview", label: "Balance Overview", icon: <BarChartOutlined /> },
      { path: "/tenant/ticketRaise", label: "Raise Complaint", icon: <FileDoneOutlined /> },
      { path: "/shared/messages", label: "Talk", icon: <MessageOutlined /> },
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
              <span style={{ marginRight: 8 }}>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
