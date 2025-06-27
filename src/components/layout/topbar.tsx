'use client';

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Dropdown, Menu } from "antd";
import { DownOutlined, MenuOutlined } from "@ant-design/icons";
import "./topbar.css";

interface TopbarProps {
  toggleSidebar: () => void;
  collapsed: boolean;
}

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar, collapsed }) => {
  const [profileImage, setProfileImage] = useState<string>("/profile.svg");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <Link href="/profile">View Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout">
        <Link href="/login">Log out</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={`topbar ${collapsed ? "collapsed" : ""}`}>
      <div className="topbar-left">
        <button className="toggle-button" onClick={toggleSidebar}>
          <MenuOutlined />
        </button>
      </div>

      <div className="topbar-right">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: "none" }}
        />

        <div className="user-info">
          <img
            src={profileImage}
            alt="User"
            className="profile"
            onClick={handleImageClick}
          />

          <Dropdown overlay={menu} trigger={["click"]}>
            <div className="user-meta-dropdown">
              <div className="user-name-role">
                <div className="username">Peter</div>
                <div className="user-id">Owner</div>
              </div>
              <DownOutlined className="dropdown-icon" />
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
