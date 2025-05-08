import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./sidebar.css";

interface SidebarProps {
  isVisible: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isVisible }) => {
  const pathname = usePathname();

  return (
    <div className={`sidebar ${isVisible ? "show" : "hidden"}`}>
      <div className="logo">
        <img src="/lcmicon.SVG" alt="LCM Logo" />
        <span className="logo-text">L.C.M</span>
      </div>

      <nav className="nav-links">
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
      </nav>
    </div>
  );
};

export default Sidebar;
