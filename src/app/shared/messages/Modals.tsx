import React, { useState } from 'react';
import styles from './messages.module.css';
import { ChatMap, GroupMembersMap } from '../../lcmapplication/types/invoice';

interface ModalsProps {
  activeTab: 'people' | 'groups';
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showAddMembersModal: boolean;
  setShowAddMembersModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedChat: string;
  setSelectedChat: React.Dispatch<React.SetStateAction<string>>;
  allUsers: string[];
  currentChats: ChatMap;
  setCurrentChats: React.Dispatch<React.SetStateAction<ChatMap>>;
  groupMembersMap: GroupMembersMap;
  setGroupMembersMap: React.Dispatch<React.SetStateAction<GroupMembersMap>>;
}

const Modals: React.FC<ModalsProps> = ({
  activeTab,
  showModal,
  setShowModal,
  showAddMembersModal,
  setShowAddMembersModal,
  selectedChat,
  setSelectedChat,
  allUsers,
  currentChats,
  setCurrentChats,
  groupMembersMap,
  setGroupMembersMap,
}) => {
  const [newChatName, setNewChatName] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedMembersToAdd, setSelectedMembersToAdd] = useState<string[]>([]);
  const [groupMembers, setGroupMembers] = useState<string[]>([]);

  const handleCreate = () => {
    if (activeTab === 'people' && selectedUser) {
      if (!currentChats[selectedUser]) {
        setCurrentChats(prev => ({ ...prev, [selectedUser]: [] }));
      }
      setSelectedChat(selectedUser);
    } else if (activeTab === 'groups' && newChatName.trim()) {
      if (!currentChats[newChatName]) {
        setCurrentChats(prev => ({ ...prev, [newChatName]: [] }));
        setGroupMembersMap(prev => ({ ...prev, [newChatName]: groupMembers }));
        setSelectedChat(newChatName);
      }
    }

    setNewChatName('');
    setSelectedUser('');
    setGroupMembers([]);
    setShowModal(false);
  };

  const handleAddMembers = () => {
    const existing = groupMembersMap[selectedChat] || [];
    const updated = [...new Set([...existing, ...selectedMembersToAdd])];
    setGroupMembersMap(prev => ({ ...prev, [selectedChat]: updated }));
    setSelectedMembersToAdd([]);
    setShowAddMembersModal(false);
  };

  return (
    <>
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>{activeTab === 'people' ? 'Start New Chat' : 'Create New Group'}</h3>
            {activeTab === 'people' ? (
              <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                <option value="">Select user</option>
                {allUsers.map(user => (
                  <option key={user} value={user}>{user}</option>
                ))}
              </select>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Group name"
                  value={newChatName}
                  onChange={(e) => setNewChatName(e.target.value)}
                />
                <label>Add Members:</label>
                <select
                  multiple
                  value={groupMembers}
                  onChange={(e) =>
                    setGroupMembers(Array.from(e.target.selectedOptions, o => o.value))
                  }
                >
                  {allUsers.map(user => (
                    <option key={user} value={user}>{user}</option>
                  ))}
                </select>
              </>
            )}
            <div className={styles.modalActions}>
              <button onClick={handleCreate}>Create</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showAddMembersModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Add Members to {selectedChat}</h3>
            <select
              multiple
              value={selectedMembersToAdd}
              onChange={(e) =>
                setSelectedMembersToAdd(Array.from(e.target.selectedOptions, o => o.value))
              }
            >
              {allUsers.map(user => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
            <div className={styles.modalActions}>
              <button onClick={handleAddMembers}>Add Members</button>
              <button onClick={() => setShowAddMembersModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modals;
