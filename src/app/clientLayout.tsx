"use client";

import React, { useState } from "react";
import Sidebar from "./lcmapplication/protected/sidebar/sidebar";
import Topbar from "./lcmapplication/protected/topbar/topbars";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false); // ✅ add this state

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev); // ✅ toggle collapsed state
  };

  return (
    <div className="main-layout" style={{ display: "flex" }}>
      <Sidebar isVisible={!collapsed} /> {/* match logic to collapsed */}
      <div
        className="content-area"
        style={{
          marginLeft: !collapsed ? "220px" : "0",
          width: "100%",
          transition: "margin-left 0.3s ease",
        }}
      >
        <Topbar toggleSidebar={toggleSidebar} collapsed={collapsed} />
        <main style={{ paddingTop: "70px" }}>{children}</main>
      </div>
    </div>
  );
};

export default ClientLayout;
