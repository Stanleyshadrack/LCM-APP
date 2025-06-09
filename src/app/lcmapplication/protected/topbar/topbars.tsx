"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
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

  return (
    <div className={`topbar-content ${collapsed ? "collapsed" : ""}`}>
      <button onClick={toggleSidebar} className="toggle-button">☰</button>

      <div className="user-info">
        <Link href="/login">
          <button className="logout-button">Log out</button>
        </Link>

        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        <img
          src={profileImage}
          alt="User"
          className="profile"
          onClick={handleImageClick}
          style={{ cursor: "pointer" }}
        />

        <div className="nameid">
          <div className="username">kamrul</div>
          <div className="user-id">TID: 23545</div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
