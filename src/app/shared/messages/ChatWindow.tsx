import React, { useEffect } from 'react';
import styles from './messages.module.css';
import { Message } from '../../lcmapplication/types/invoice';
import { SendOutlined } from '@ant-design/icons';

interface ChatWindowProps {
  selectedChat: string;
  messages: Message[];
  message: string;
  setMessage: (value: string) => void;
  onSend: () => void;
  isGroup: boolean;
  onAddMembers: () => void;
  isTyping?: boolean;
  messagesEndRef?: React.RefObject<HTMLDivElement | null>; // <-- fixed here
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  selectedChat,
  messages,
  message,
  setMessage,
  onSend,
  isGroup,
  onAddMembers,
  isTyping,
  messagesEndRef,
}) => {
  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, messagesEndRef]);

  return (
    <div className={styles.chatWindow}>
      <div className={styles.chatTitle}>
        <div className={styles.avatarLarge}>{selectedChat[0]}</div>
        <div className={styles.nameStatus}>
          <div className={styles.chatName}>{selectedChat}</div>
          <div className={styles.chatStatus}>{isTyping ? 'Typing...' : 'Online'}</div>
        </div>
      </div>

      <div className={styles.chatMessages}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`${styles.chatBubble} ${
              msg.sender === 'me' ? styles.sent : styles.received
            }`}
          >
            <div className={styles.bubbleText}>{msg.text}</div>
            <div className={styles.bubbleTime}>{msg.time}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.chatInput}>
        <input
          type="text"
          value={message}
          placeholder="Type a message..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSend()}
        />
        <button onClick={onSend}><SendOutlined /></button>
      </div>

      {isGroup && (
        <button
          className={styles.floatingAddMembersBtn}
          title="Add members"
          onClick={onAddMembers}
        >
          +
        </button>
      )}
    </div>
  );
};

export default ChatWindow;
