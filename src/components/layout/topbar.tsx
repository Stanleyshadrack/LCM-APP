"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Dropdown, Menu, Modal } from "antd";
import { DownOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import "./topbar.css";

interface TopbarProps {
  toggleSidebar: () => void;
  collapsed: boolean;
  isMobile: boolean;
}

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar, collapsed, isMobile }) => {
  const [profileImage, setProfileImage] = useState<string>("/profile.svg");
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const showProfileModal = () => {
    setIsProfileModalVisible(true);
    setMobileMenuOpen(false);
  };

  const handleProfileCancel = () => setIsProfileModalVisible(false);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const menu = (
    <Menu>
      <Menu.Item key="profile" onClick={showProfileModal}>
        View Profile
      </Menu.Item>
      <Menu.Item key="logout">
        <Link href="/login">Log out</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className={`topbar ${collapsed ? "collapsed" : ""}`}>
        <div className="topbar-left">
          {!isMobile && (
            <button className="toggle-button" onClick={toggleSidebar}>
              <MenuOutlined />
            </button>
          )}
        {isMobile && (
  <button className="mobile-menu-toggle" onClick={toggleSidebar}>
    {collapsed ? <MenuOutlined /> : <CloseOutlined />}
  </button>
)}

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

          <Dropdown
  menu={{
    items: [
      {
        key: "profile",
        label: <span onClick={showProfileModal}>View Profile</span>,
      },
      {
        key: "logout",
        label: <Link href="/login">Log out</Link>,
      },
    ],
  }}
  trigger={["click"]}
>
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

      {mobileMenuOpen && (
        <div className="topbar-mobile-menu">
          <div onClick={showProfileModal}>View Profile</div>
          <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
            Log Out
          </Link>
        </div>
      )}

      <Modal
        title="User Profile"
        open={isProfileModalVisible}
        onCancel={handleProfileCancel}
        footer={[
          <button key="edit" className="edit-button" onClick={() => alert("Edit logic here")}>
            Edit User Details
          </button>
        ]}
      >
        <div className="profile-modal-content">
          <img src={profileImage} alt="User" className="modal-profile-img" />
          <div className="modal-user-details">
            <p><strong>Name:</strong> Peter</p>
            <p><strong>Role:</strong> Owner</p>
            <p><strong>Email:</strong> peter@example.com</p>
            <p><strong>Phone:</strong> +123456789</p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Topbar;
