import React from "react";
import "./topbar.css";

interface TopbarProps {
  toggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar }) => {
  return (
    <div className="topbar-content">
      <button onClick={toggleSidebar} className="toggle-button">☰</button>

      {/* <div className="language-selector">
        <button>🌐 English</button>
      </div> */}

      <div className="user-info">
        <button className="logout-button">Log out</button>
        <img src="/profile.svg" alt="User" className="profile" />
        <div className="nameid">
          <div className="username">kamrul</div>
          <div className="user-id">TID: 23545</div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
