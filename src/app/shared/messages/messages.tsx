import React, { useState, useEffect, useRef } from 'react';
import styles from './messages.module.css';
import ChatSidebar from './chatSidebar';
import ChatWindow from './ChatWindow';
import Modals from './Modals';
import { ChatMap, GroupMembersMap } from '@/app/lcmapplication/types/invoice';
import { Message } from './chats';

const allUsers = ['John Doe', 'Peter', 'Aika', 'Sarah', 'Michael'];

const initialPersonalChats: ChatMap = {
  Aika: [
    { sender: 'John Doe', text: 'Hey there!', time: '10:00 AM' },
    { sender: 'me', text: 'Hi John!', time: '10:01 AM' },
  ],
  Peter: [
    { sender: 'Peter', text: 'Ready for the update?', time: '8:45 AM' },
    { sender: 'me', text: 'Yes, all set!', time: '8:46 AM' },
  ],
};

const initialGroupChats: ChatMap = {
  Alpha: [
    { sender: 'Team Alpha', text: 'Let’s meet at 3PM', time: '9:30 AM' },
    { sender: 'me', text: 'Sure, see you!', time: '9:31 AM' },
  ],
};

const initialGroupMembersMap: GroupMembersMap = {
  Alpha: ['John Doe', 'Sarah'],
};

const ChatUI: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'people' | 'groups'>('people');
  const [selectedChat, setSelectedChat] = useState('Aika');
  const [message, setMessage] = useState('');
  const [personalChats, setPersonalChats] = useState<ChatMap>(initialPersonalChats);
  const [groupChats, setGroupChats] = useState<ChatMap>(initialGroupChats);
  const [groupMembersMap, setGroupMembersMap] = useState<GroupMembersMap>(initialGroupMembersMap);
  const [showModal, setShowModal] = useState(false);
  const [showAddMembersModal, setShowAddMembersModal] = useState(false);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
  const [typingStatus, setTypingStatus] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentChats = activeTab === 'people' ? personalChats : groupChats;
  const setCurrentChats = activeTab === 'people' ? setPersonalChats : setGroupChats;

  // Handle chat deletion
  const handleDeleteChat = (chatName: string) => {
    setCurrentChats((prev) => {
      const updated = { ...prev };
      delete updated[chatName];
      return updated;
    });

    if (selectedChat === chatName) {
      const remaining = Object.keys(currentChats).filter((c) => c !== chatName);
      setSelectedChat(remaining[0] || '');
    }
  };

  // Scroll and reset unread count
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    setUnreadCounts((prev) => ({ ...prev, [selectedChat]: 0 }));
  }, [selectedChat, currentChats]);

  // Send message
  const handleSend = () => {
    if (!message.trim()) return;

    const newMsg: Message = {
      sender: 'me',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setCurrentChats((prev) => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMsg],
    }));

    setMessage('');
    setTypingStatus((prev) => ({ ...prev, [selectedChat]: false }));
  };

  // Simulated auto-reply
  useEffect(() => {
    const timeout = setTimeout(() => {
      const incoming: Message = {
        sender: selectedChat,
        text: 'Auto reply!',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      const isActive = selectedChat;
      const chats = activeTab === 'people' ? personalChats : groupChats;
      const setChats = activeTab === 'people' ? setPersonalChats : setGroupChats;

      setChats((prev) => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), incoming],
      }));

      if (isActive !== selectedChat) {
        setUnreadCounts((prev) => ({
          ...prev,
          [selectedChat]: (prev[selectedChat] || 0) + 1,
        }));
      }
    }, 60000);

    return () => clearTimeout(timeout);
  }, []); // Only on first mount

  // Typing timeout
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      setTypingStatus((prev) => ({ ...prev, [selectedChat]: false }));
    }, 2000);
    return () => clearTimeout(timer);
  }, [message, selectedChat]);

  return (
    <div className={styles.chatContainer}>
      <ChatSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        currentChats={currentChats}
        allUsers={allUsers}
        setShowModal={setShowModal}
        unreadCounts={unreadCounts}
        typingStatus={typingStatus}
        onDeleteChat={handleDeleteChat}
      />

      <ChatWindow
        selectedChat={selectedChat}
        messages={currentChats[selectedChat] || []}
        message={message}
        setMessage={(val) => {
          setMessage(val);
          setTypingStatus((prev) => ({ ...prev, [selectedChat]: !!val }));
        }}
        onSend={handleSend}
        onAddMembers={() => setShowAddMembersModal(true)}
        isGroup={activeTab === 'groups'}
        messagesEndRef={messagesEndRef}
      />

      <Modals
        activeTab={activeTab}
        showModal={showModal}
        setShowModal={setShowModal}
        showAddMembersModal={showAddMembersModal}
        setShowAddMembersModal={setShowAddMembersModal}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        allUsers={allUsers}
        currentChats={currentChats}
        setCurrentChats={setCurrentChats}
        groupMembersMap={groupMembersMap}
        setGroupMembersMap={setGroupMembersMap}
      />
    </div>
  );
};

export default ChatUI;
