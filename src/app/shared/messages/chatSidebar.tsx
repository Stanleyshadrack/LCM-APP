import React, { useState } from 'react';
import styles from './messages.module.css';
import { Message } from '../../lcmapplication/types/invoice';

interface ChatSidebarProps {
  activeTab: 'people' | 'groups';
  setActiveTab: (tab: 'people' | 'groups') => void;
  selectedChat: string;
  setSelectedChat: (name: string) => void;
  currentChats: Record<string, Message[]>;
  allUsers: string[];
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  unreadCounts: Record<string, number>;
  typingStatus: Record<string, boolean>;
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
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const displayList =
    activeTab === 'people'
      ? allUsers.filter((name) =>
          name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : Object.keys(currentChats).filter((name) =>
          name.toLowerCase().includes(searchTerm.toLowerCase())
        );

  return (
    <div className={styles.chatSidebar}>
      <div className={styles.chatUserProfile}>
        <div className={styles.avatarLarge}>{selectedChat[0]}</div>
        <div className={styles.chatUsername}>{selectedChat}</div>
      </div>

      <div className={styles.tabs}>
        <button
          className={activeTab === 'people' ? styles.active : ''}
          onClick={() => setActiveTab('people')}
        >
          People
        </button>
        <button
          className={activeTab === 'groups' ? styles.active : ''}
          onClick={() => setActiveTab('groups')}
        >
          Groups
        </button>
      </div>

      <div className={styles.chatActions}>
        <button onClick={() => setShowModal(true)}>
          + {activeTab === 'people' ? 'New Chat' : 'New Group'}
        </button>
      </div>

      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles.chatList}>
        {displayList.map((name) => (
          <div
            key={name}
            className={`${styles.chatItem} ${
              selectedChat === name ? styles.selected : ''
            }`}
            onClick={() => setSelectedChat(name)}
          >
            <div className={styles.avatar}>{name[0]}</div>
            <div className={styles.chatInfo}>
              <div className={styles.name}>
                {name}
                {unreadCounts[name] > 0 && (
                  <span className={styles.unreadBadge}>{unreadCounts[name]}</span>
                )}
              </div>
              <div className={styles.preview}>
                {typingStatus[name]
                  ? <em>Typing...</em>
                  : currentChats[name]?.slice(-1)[0]?.text || 'No messages yet'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
