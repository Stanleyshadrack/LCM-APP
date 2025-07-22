"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import { useAuth } from "@/app/context/AuthContext";

const RoleBasedLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setCollapsed(mobile); 
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  return (
    <>
      {isMobile && !collapsed && (
        <div
          className="mobile-overlay"
          onClick={() => setCollapsed(true)}
        ></div>
      )}

      <Sidebar
        isVisible={!collapsed}
        isMobile={isMobile}
        onClose={() => setCollapsed(true)}
        role={user!.role}
      />

      <div
        className={`main-content ${collapsed ? "collapsed" : "expanded"}`}
        style={{
          marginLeft: isMobile || collapsed ? 0 : 220,
          transition: "margin-left 0.3s ease",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Topbar
          toggleSidebar={toggleSidebar}
          collapsed={collapsed}
          isMobile={isMobile}
        />
        <main
          style={{
            paddingTop: isMobile ? "70px" : "90px",
            padding: isMobile ? "10px 12px" : "20px",
          }}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default RoleBasedLayout;
