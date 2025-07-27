import React, { useState, useEffect, useRef } from 'react';
import styles from './messages.module.css';
import ChatWindow from './ChatWindow';
import Modals from './Modals';
import ChartSidebar from './chatSidebar';

// Define the message structure
export type Message = {
  sender: string;
  text: string;
  time: string;
};

type ChatMap = Record<string, Message[]>;
type GroupMembersMap = Record<string, string[]>;

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

export default function ChatModal() {
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

  // Auto-scroll and reset unread count on chat change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    setUnreadCounts((prev) => ({ ...prev, [selectedChat]: 0 }));
  }, [selectedChat, currentChats]);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMsg: Message = {
      sender: 'me',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setCurrentChats((prev: ChatMap) => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMsg],
    }));

    setMessage('');
    setTypingStatus((prev) => ({ ...prev, [selectedChat]: false }));
  };

  // Simulate incoming message
  useEffect(() => {
    const timer = setTimeout(() => {
      const incoming: Message = {
        sender: selectedChat,
        text: 'Auto reply!',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setCurrentChats((prev) => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), incoming],
      }));

      setUnreadCounts((prev) => ({
        ...prev,
        [selectedChat]: selectedChat in prev ? prev[selectedChat] + 1 : 1,
      }));
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.chatContainer}>
      <ChartSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        currentChats={currentChats}
        allUsers={allUsers}
        setShowModal={setShowModal}
        unreadCounts={unreadCounts}
        typingStatus={typingStatus}
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
        isGroup={activeTab === 'groups'}
        onAddMembers={() => setShowAddMembersModal(true)}
        isTyping={typingStatus[selectedChat] || false}
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
}
