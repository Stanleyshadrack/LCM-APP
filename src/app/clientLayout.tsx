"use client";

import React, { useState } from "react";
import Sidebar from "./lcmapplication/protected/sidebar/sidebar";
import Topbar from "./lcmapplication/protected/topbar/topbars";


const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  return (
    <div className="main-layout" style={{ display: "flex" }}>
      <Sidebar isVisible={isSidebarVisible} />
      <div className="content-area" style={{ marginLeft: isSidebarVisible ? "220px" : "0", width: "100%" }}>
        <Topbar toggleSidebar={toggleSidebar} />
        <main style={{ paddingTop: "70px" }}>{children}</main>
      </div>
    </div>
  );
};

export default ClientLayout;
