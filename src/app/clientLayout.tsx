"use client";

import React, { useState } from "react";
import Sidebar from "./lcmapplication/protected/sidebar/sidebar";
import Topbar from "./lcmapplication/protected/topbar/topbars";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div className="main-layout" style={{ display: "flex", background: "#f5f5f5" }}>
      <Sidebar isVisible={!collapsed} />
      <div
        className="content-area"
        style={{
          marginLeft: !collapsed ? "220px" : "0",
          width: "100%",
          transition: "margin-left 0.3s ease",
        }}
      >
        <Topbar toggleSidebar={toggleSidebar} collapsed={collapsed} />
        <main style={{ paddingTop: "70px", padding: "20px" }}>{children}</main>
      </div>
    </div>
  );
};

export default ClientLayout;
