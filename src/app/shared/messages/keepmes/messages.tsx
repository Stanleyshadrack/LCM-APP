import React, { useState, useEffect, useRef } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import './messages.css';

type Message = {
  sender: string;
  text: string;
  time: string;
  read?: boolean;
  file?: string;
};

const initialPersonalChats: Record<string, Message[]> = {
  Aika: [
    { sender: 'John Doe', text: 'Hey there!', time: '10:00 AM', read: true },
    { sender: 'me', text: 'Hi John!', time: '10:01 AM', read: true },
  ],
  Peter: [
    { sender: 'Peter', text: 'Ready for the update?', time: '8:45 AM', read: false },
    { sender: 'me', text: 'Yes, all set!', time: '8:46 AM', read: false },
  ],
};

const initialGroupChats: Record<string, Message[]> = {
  Alpha: [
    { sender: 'Team Alpha', text: 'Let’s meet at 3PM', time: '9:30 AM', read: true },
    { sender: 'me', text: 'Sure, see you!', time: '9:31 AM', read: true },
  ],
};

const ChatModal = () => {
  const [activeTab, setActiveTab] = useState<'people' | 'groups'>('people');
  const [selectedChat, setSelectedChat] = useState('Aika');
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showChatWindow, setShowChatWindow] = useState(false);

  const [personalChats, setPersonalChats] = useState(initialPersonalChats);
  const [groupChats, setGroupChats] = useState(initialGroupChats);
  const [groupMembersMap] = useState<Record<string, string[]>>({
    Alpha: ['John Doe', 'Sarah'],
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentChats = activeTab === 'people' ? personalChats : groupChats;
  const setCurrentChats = activeTab === 'people' ? setPersonalChats : setGroupChats;

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChats, selectedChat]);

  const handleSend = () => {
    if (!message.trim() && !attachment) return;

    const newMessage: Message = {
      sender: 'me',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
      file: attachment ? URL.createObjectURL(attachment) : undefined,
    };

    setCurrentChats(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage],
    }));

    setMessage('');
    setAttachment(null);
    setShowEmojiPicker(false);
  };

  const handleSelectChat = (chat: string) => {
    setSelectedChat(chat);
    setCurrentChats(prev => {
      const updatedMessages = (prev[chat] || []).map(msg => ({ ...msg, read: true }));
      return { ...prev, [chat]: updatedMessages };
    });
    if (isMobileView) {
      setShowChatWindow(true);
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    if (emoji?.native) {
      setMessage(prev => prev + emoji.native);
    }
  };

  return (
    <div className="chat-container  ">
      {(!isMobileView || !showChatWindow) && (
        <div className="chat-sidebar">
          <div className="chat-user-profile">
            <div className="avatar-large">{selectedChat[0]}</div>
            <div className="chat-username">{selectedChat}</div>
          </div>

          <div className="tabs">
            {['people', 'groups'].map(tab => (
              <button
                key={tab}
                className={activeTab === tab ? 'active' : ''}
                onClick={() => setActiveTab(tab as 'people' | 'groups')}
              >
                {tab === 'people' ? 'People' : 'Groups'}
              </button>
            ))}
          </div>

          <div className="chat-actions">
            <button onClick={() => alert('Add new chat or group logic here')}>
              + {activeTab === 'people' ? 'New Chat' : 'New Group'}
            </button>
          </div>

          <div className="chat-list">
            {Object.entries(currentChats).map(([name, messages]) => {
              const lastMessage = messages[messages.length - 1];
              const hasUnread = messages.some(m => !m.read && m.sender !== 'me');

              return (
                <div
                  key={name}
                  className={`chat-item ${selectedChat === name ? 'selected' : ''}`}
                  onClick={() => handleSelectChat(name)}
                >
                  <div className="avatar">{name.split(' ').map(w => w[0]).join('')}</div>
                  <div className="chat-info">
                    <div className="name">{name}</div>
                    <div className="preview">
                      {lastMessage?.file
                        ? '📎 Attachment'
                        : lastMessage?.text || 'No messages yet'}
                    </div>
                  </div>
                  {hasUnread && <div className="chat-badge">New</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {(!isMobileView || showChatWindow) && (
        <div className="chat-window">
          {isMobileView && (
            <button className="back-button" onClick={() => setShowChatWindow(false)}>
              ← Back
            </button>
          )}
          <div className="chat-title">
            <div className="avatar-large">{selectedChat[0]}</div>
            <div className="name-status">
              <div className="chat-name">{selectedChat}</div>
              <div className="chat-status">Online</div>
            </div>
          </div>

          <div className="chat-messages">
            {(currentChats[selectedChat] || []).map((msg, i) => (
              <div
                key={i}
                className={`chat-bubble ${msg.sender === 'me' ? 'sent' : 'received'}`}
              >
                {msg.text && <div className="bubble-text">{msg.text}</div>}
                {msg.file && (
                  <div className="bubble-text">
                    {msg.file.endsWith('.jpg') || msg.file.endsWith('.png') ? (
                      <img
                        src={msg.file}
                        alt="attachment"
                        style={{ maxWidth: '100%', borderRadius: 8 }}
                      />
                    ) : (
                      <a href={msg.file} download target="_blank" rel="noopener noreferrer">
                        📎 Download File
                      </a>
                    )}
                  </div>
                )}
                <div className="bubble-time">{msg.time}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <label className="upload-button">
              📎
              <input
                type="file"
                accept="image/*,.pdf,.doc,.docx"
                onChange={e => setAttachment(e.target.files?.[0] || null)}
                style={{ display: 'none' }}
              />
            </label>
            <button onClick={() => setShowEmojiPicker(p => !p)}>😊</button>
            <button onClick={handleSend}>Send</button>
          </div>

          {showEmojiPicker && (
            <div style={{ position: 'absolute', bottom: '90px', right: '24px', zIndex: 10 }}>
              <Picker data={data} onEmojiSelect={handleEmojiSelect} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatModal;
