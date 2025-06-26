"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";
import Topbar from "./topbar";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const noLayoutRoutes = ["/", "/login", "/signup", "/account-type", "/forgot-password"];
  const isNoLayout = noLayoutRoutes.includes(pathname);

  const [collapsed, setCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  if (isNoLayout) return <>{children}</>;

  return (
    <>
      <Sidebar isVisible={!collapsed} isMobile={isMobile} />

      <div
        className={`main-content ${collapsed ? "collapsed" : "expanded"}`}
        style={{
          marginLeft: collapsed ? 0 : 220,
          transition: "margin-left 0.3s ease",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Topbar toggleSidebar={toggleSidebar} collapsed={collapsed} />
        <main style={{ padding: "20px", paddingTop: "90px" }}>{children}</main>
      </div>
    </>
  );
};

export default ClientLayout;
