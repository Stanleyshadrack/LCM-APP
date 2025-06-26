"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./topbar.css";

interface TopbarProps {
  toggleSidebar: () => void;
  collapsed: boolean;
}

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar }) => {
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
    <div className="topbar">
      <button className="toggle-button" onClick={toggleSidebar}>
        ☰
      </button>

      <div className="user-section">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: "none" }}
        />

        <Dropdown overlay={menu} trigger={["click"]}>
          <div className="user-info" onClick={handleImageClick}>
            <img src={profileImage} alt="User" className="profile" />
            <div className="nameid">
              <div className="username">kamrul</div>
              <div className="user-id">TID: 23545</div>
            </div>
            <DownOutlined className="dropdown-icon" />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default Topbar;
