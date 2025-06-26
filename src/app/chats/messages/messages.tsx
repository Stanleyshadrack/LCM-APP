import React, { useState, useEffect, useRef } from 'react';
import './messages.css';

const allUsers = ['John Doe', 'Peter', 'Aika', 'Sarah', 'Michael'];

type Message = {
  sender: string;
  text: string;
  time: string;
};

const initialPersonalChats: Record<string, Message[]> = {
  Aika: [
    { sender: 'John Doe', text: 'Hey there!', time: '10:00 AM' },
    { sender: 'me', text: 'Hi John!', time: '10:01 AM' },
  ],
  Peter: [
    { sender: 'Peter', text: 'Ready for the update?', time: '8:45 AM' },
    { sender: 'me', text: 'Yes, all set!', time: '8:46 AM' },
  ],
};

const initialGroupChats: Record<string, Message[]> = {
  Alpha: [
    { sender: 'Team Alpha', text: 'Let’s meet at 3PM', time: '9:30 AM' },
    { sender: 'me', text: 'Sure, see you!', time: '9:31 AM' },
  ],
};

const initialGroupMembersMap: Record<string, string[]> = {
  Alpha: ['John Doe', 'Sarah'],
};

const ChatModal = () => {
  const [activeTab, setActiveTab] = useState<'people' | 'groups'>('people');
  const [selectedChat, setSelectedChat] = useState('Aika');
  const [message, setMessage] = useState('');
  const [personalChats, setPersonalChats] = useState(initialPersonalChats);
  const [groupChats, setGroupChats] = useState(initialGroupChats);
  const [groupMembersMap, setGroupMembersMap] = useState<Record<string, string[]>>(initialGroupMembersMap);

  const [showModal, setShowModal] = useState(false);
  const [newChatName, setNewChatName] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [groupMembers, setGroupMembers] = useState<string[]>([]);

  // New state for adding members to existing group
  const [showAddMembersModal, setShowAddMembersModal] = useState(false);
  const [selectedMembersToAdd, setSelectedMembersToAdd] = useState<string[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentChats = activeTab === 'people' ? personalChats : groupChats;
  const setCurrentChats = activeTab === 'people' ? setPersonalChats : setGroupChats;

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      sender: 'me',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setCurrentChats(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage],
    }));

    setMessage('');
  };

  const handleCreateNew = () => {
    if (activeTab === 'people') {
      if (!selectedUser.trim()) {
        alert('Please select a user');
        return;
      }
      if (currentChats[selectedUser]) {
        alert('Chat already exists.');
        return;
      }
      setCurrentChats(prev => ({
        ...prev,
        [selectedUser]: [],
      }));
      setSelectedChat(selectedUser);
    } else {
      if (!newChatName.trim()) {
        alert('Please enter a group name');
        return;
      }
      if (currentChats[newChatName]) {
        alert('Group name already exists.');
        return;
      }
      if (groupMembers.length === 0) {
        alert('Please select at least one group member');
        return;
      }
      setCurrentChats(prev => ({
        ...prev,
        [newChatName]: [],
      }));
      setGroupMembersMap(prev => ({
        ...prev,
        [newChatName]: groupMembers,
      }));
      setSelectedChat(newChatName);
    }

    setShowModal(false);
    setNewChatName('');
    setSelectedUser('');
    setGroupMembers([]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChats, selectedChat]);

  const toggleGroupMember = (member: string) => {
    setGroupMembers(prev =>
      prev.includes(member) ? prev.filter(m => m !== member) : [...prev, member]
    );
  };

  // For adding members to existing group
  const toggleMemberToAdd = (member: string) => {
    setSelectedMembersToAdd(prev =>
      prev.includes(member) ? prev.filter(m => m !== member) : [...prev, member]
    );
  };

  const handleAddMembersToGroup = () => {
    if (selectedMembersToAdd.length === 0) {
      alert('Please select at least one member to add');
      return;
    }

    setGroupMembersMap(prev => {
      const existingMembers = prev[selectedChat] || [];
      // Add only members not already in group
      const updatedMembers = [...existingMembers, ...selectedMembersToAdd.filter(m => !existingMembers.includes(m))];
      return {
        ...prev,
        [selectedChat]: updatedMembers,
      };
    });

    setShowAddMembersModal(false);
    setSelectedMembersToAdd([]);
  };

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <div className="chat-user-profile">
          <div className="avatar-large">{selectedChat[0]}</div>
          <div>
            <div className="chat-username">{selectedChat}</div>
          </div>
        </div>

        <div className="tabs">
          <button
            className={activeTab === 'people' ? 'active' : ''}
            onClick={() => setActiveTab('people')}
          >
            People
          </button>
          <button
            className={activeTab === 'groups' ? 'active' : ''}
            onClick={() => setActiveTab('groups')}
          >
            Groups
          </button>
        </div>

        <div className="chat-actions">
          <button onClick={() => setShowModal(true)}>
            + {activeTab === 'people' ? 'New Chat' : 'New Group'}
          </button>
        </div>

        <div className="chat-list">
          {Object.keys(currentChats).map(name => (
            <div
              key={name}
              className={`chat-item ${selectedChat === name ? 'selected' : ''}`}
              onClick={() => setSelectedChat(name)}
            >
              <div className="avatar">{name.split(' ').map(w => w[0]).join('')}</div>
              <div className="chat-info">
                <div className="name">{name}</div>
                <div className="preview">
                  {currentChats[name][currentChats[name].length - 1]?.text || 'No messages yet'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-window">
        <div className="chat-title">
          <div className="avatar-large">{selectedChat[0]}</div>
          <div className="name-status">
            <div className="chat-name">{selectedChat}</div>
            <div className="chat-status">Online</div>
          </div>
        </div>

        <div className="chat-messages">
          {(currentChats[selectedChat] || []).map((msg, index) => (
            <div
              key={index}
              className={`chat-bubble ${msg.sender === 'me' ? 'sent' : 'received'}`}
            >
              <div className="bubble-text">{msg.text}</div>
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
          <button onClick={handleSend}>Send</button>
        </div>

        {/* Floating plus button to add members in group chat */}
        {activeTab === 'groups' && (
          <button
            className="floating-add-members-btn"
            title="Add members"
            onClick={() => {
              // Initialize selection with members not yet added
              const existingMembers = groupMembersMap[selectedChat] || [];
              const notInGroup = allUsers.filter(u => !existingMembers.includes(u));
              setSelectedMembersToAdd([]); // clear
              setShowAddMembersModal(true);
            }}
          >
            +
          </button>
        )}
      </div>

      {/* Modal for creating new chat or group */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            {activeTab === 'people' ? (
              <>
                <h3>Create New Chat</h3>
                <select
                  value={selectedUser}
                  onChange={e => setSelectedUser(e.target.value)}
                >
                  <option value="">Select User</option>
                  {allUsers.map(user => (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <>
                <h3>Create New Group</h3>
                <input
                  type="text"
                  placeholder="Group Name"
                  value={newChatName}
                  onChange={e => setNewChatName(e.target.value)}
                />
                <div>
                  <h4>Select Members</h4>
                  <div className="members-list">
                    {allUsers.map(user => (
                      <label key={user}>
                        <input
                          type="checkbox"
                          checked={groupMembers.includes(user)}
                          onChange={() => toggleGroupMember(user)}
                        />
                        {user}
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}
            <button onClick={handleCreateNew}>Create</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Modal to add members to existing group */}
      {showAddMembersModal && (
        <div className="modal-overlay" onClick={() => setShowAddMembersModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Add Members to {selectedChat}</h3>
            <div className="members-list">
              {(allUsers.filter(u => !(groupMembersMap[selectedChat] || []).includes(u))).map(user => (
                <label key={user}>
                  <input
                    type="checkbox"
                    checked={selectedMembersToAdd.includes(user)}
                    onChange={() => toggleMemberToAdd(user)}
                  />
                  {user}
                </label>
              ))}
              {allUsers.filter(u => !(groupMembersMap[selectedChat] || []).includes(u)).length === 0 && (
                <p>All users are already members.</p>
              )}
            </div>
            <button onClick={handleAddMembersToGroup}>Add Members</button>
            <button onClick={() => setShowAddMembersModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatModal;
