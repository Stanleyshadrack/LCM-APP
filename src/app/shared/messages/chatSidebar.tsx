import React, { useState } from "react";
import styles from "./messages.module.css";
import { Message } from "../../lcmapplication/types/invoice";
import { MessageOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface ChatSidebarProps {
  activeTab: "people" | "groups";
  setActiveTab: (tab: "people" | "groups") => void;
  selectedChat: string;
  setSelectedChat: (name: string) => void;
  currentChats: Record<string, Message[]>;
  allUsers: string[];
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  unreadCounts: Record<string, number>;
  typingStatus: Record<string, boolean>;
  onDeleteChat: (chatName: string) => void;
  onlineUsers?: string[];
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  activeTab,
  setActiveTab,
  selectedChat,
  setSelectedChat,
  currentChats,
  allUsers,
  setShowModal,
  unreadCounts,
  typingStatus,
  onDeleteChat,
  onlineUsers = [],
}) => {
  const currentUser = "John Doe"; // Replace with auth if needed
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const displayList =
    activeTab === "people"
      ? allUsers.filter((name) =>
          name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : Object.keys(currentChats).filter((name) =>
          name.toLowerCase().includes(searchTerm.toLowerCase())
        );

  const handleDelete = (name: string) => {
    const confirm = window.confirm(`Are you sure you want to delete chat with ${name}?`);
    if (confirm) onDeleteChat(name);
  };

  const isUserOnline = (name: string) => onlineUsers?.includes(name);

  return (
    <div className={styles.chatSidebar}>
      {/* Own Profile */}
      <div className={styles.chatUserProfile}>
        <div className={styles.avatarLarge}>{currentUser[0]}</div>
        <div className={styles.chatUsername}>{currentUser}</div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={activeTab === "people" ? styles.active : ""}
          onClick={() => setActiveTab("people")}
        >
          People
        </button>
        <button
          className={activeTab === "groups" ? styles.active : ""}
          onClick={() => setActiveTab("groups")}
        >
          Groups
        </button>
      </div>

      {/* Search */}
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Chat List */}
      <div className={styles.chatListWrapper}>
        <div className={styles.chatList}>
          {displayList.map((name) => (
            <div
              key={name}
              className={`${styles.chatItem} ${selectedChat === name ? styles.selected : ""}`}
              onClick={() => setSelectedChat(name)}
            >
              <div className={styles.avatar}>
                {name[0]}
                {isUserOnline(name) && <span className={styles.statusDotOnline} />}
              </div>

              <div className={styles.chatInfo}>
                <div className={styles.name}>
                  {name}
                  {unreadCounts[name] > 0 && (
                    <span className={styles.unreadBadge}>{unreadCounts[name]}</span>
                  )}
                </div>

                <div className={styles.preview}>
                  {typingStatus[name] ? (
                    <em>Typing...</em>
                  ) : (
                    currentChats[name]?.slice(-1)[0]?.text || "No messages yet"
                  )}
                </div>

                <div className={styles.presenceStatus}>
                  {isUserOnline(name)
                    ? "Active now"
                    : currentChats[name]?.length
                      ? `Last seen ${dayjs().to(dayjs().subtract(5, "minutes"))}` // Placeholder
                      : ""}
                </div>
              </div>

              <div
                className={styles.moreWrapper}
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownOpen(dropdownOpen === name ? null : name);
                }}
              >
                <span className={styles.moreIcon}>⋯</span>
                {dropdownOpen === name && (
                  <div className={styles.dropdownMenu}>
                    <div onClick={() => { handleDelete(name); setDropdownOpen(null); }}>🗑 Delete</div>
                    <div onClick={() => { alert("Archived!"); setDropdownOpen(null); }}>📥 Archive</div>
                    <div onClick={() => { alert("Pinned!"); setDropdownOpen(null); }}>📌 Pin</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Floating New Chat Button */}
        <Tooltip title={activeTab === "people" ? "New Chat" : "New Group"} placement="left">
          <button
            className={styles.floatingNewChatBtnOverList}
            onClick={() => setShowModal(true)}
          >
            {activeTab === "people" ? <MessageOutlined /> : <UsergroupAddOutlined />}
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default ChatSidebar;
