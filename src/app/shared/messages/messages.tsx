"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  collection,
  doc,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import styles from "./messages.module.css";
import ChatSidebar from "./chatSidebar";
import ChatWindow from "./ChatWindow";
import Modals from "./Modals";
import { db } from "./firebase/firebase";
import { Message } from "./chats";
import { ChatMap, GroupMembersMap } from "@/app/lcmapplication/types/invoice";

const allUsers = ["John Doe", "Peter", "Aika", "Sarah", "Michael"];
const currentUser = "me"; // Replace with auth logic

const ChatUI: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"people" | "groups">("people");
  const [selectedChat, setSelectedChat] = useState("Aika");
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState<ChatMap>({});
  const [groupMembersMap, setGroupMembersMap] = useState<GroupMembersMap>({});
  const [showModal, setShowModal] = useState(false);
  const [showAddMembersModal, setShowAddMembersModal] = useState(false);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
  const [typingStatus, setTypingStatus] = useState<Record<string, boolean>>({});
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatType = activeTab === "people" ? "personal" : "group";

  // Presence tracking
  useEffect(() => {
    const userDoc = doc(db, "presence", currentUser);
    setDoc(userDoc, { online: true }, { merge: true });

    const unsubPresence = onSnapshot(collection(db, "presence"), (snap) => {
      const online = snap.docs
        .filter((doc) => doc.data().online)
        .map((doc) => doc.id);
      setOnlineUsers(online);
    });

    return () => {
      updateDoc(userDoc, { online: false });
      unsubPresence();
    };
  }, []);

  // Load messages from Firestore in real-time
  useEffect(() => {
    if (!selectedChat) return;
    const chatRef = collection(db, "chats", selectedChat, "messages");
    const q = query(chatRef, orderBy("time", "asc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const newMessages: Message[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          sender: data.sender,
          text: data.text,
          time: new Date(data.time?.seconds * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
      });
      setChats((prev) => ({ ...prev, [selectedChat]: newMessages }));
    });

    return () => unsub();
  }, [selectedChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setUnreadCounts((prev) => ({ ...prev, [selectedChat]: 0 }));
  }, [selectedChat, chats]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const newMsg: Omit<Message, "time"> = {
      sender: currentUser,
      text: message,
    };

    await addDoc(collection(db, "chats", selectedChat, "messages"), {
      ...newMsg,
      time: serverTimestamp(),
    });

    setMessage("");
    setTypingStatus((prev) => ({ ...prev, [selectedChat]: false }));
  };

  const handleDeleteChat = async (chatName: string) => {
    setChats((prev) => {
      const updated = { ...prev };
      delete updated[chatName];
      return updated;
    });

    if (selectedChat === chatName) {
      const remaining = Object.keys(chats).filter((c) => c !== chatName);
      setSelectedChat(remaining[0] || "");
    }
  };

  // Typing indicator
  useEffect(() => {
    if (!message) return;
    setTypingStatus((prev) => ({ ...prev, [selectedChat]: true }));

    const timeout = setTimeout(() => {
      setTypingStatus((prev) => ({ ...prev, [selectedChat]: false }));
    }, 2000);

    return () => clearTimeout(timeout);
  }, [message, selectedChat]);

  return (
    <div className={styles.chatContainer}>
      <ChatSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        currentChats={chats}
        allUsers={allUsers}
        setShowModal={setShowModal}
        unreadCounts={unreadCounts}
        typingStatus={typingStatus}
        onDeleteChat={handleDeleteChat}
        onlineUsers={onlineUsers}
      />

      <ChatWindow
        selectedChat={selectedChat}
        messages={chats[selectedChat] || []}
        message={message}
        setMessage={(val) => {
          setMessage(val);
          setTypingStatus((prev) => ({ ...prev, [selectedChat]: !!val }));
        }}
        onSend={handleSend}
        onAddMembers={() => setShowAddMembersModal(true)}
        isGroup={activeTab === "groups"}
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
        currentChats={chats}
        setCurrentChats={setChats}
        groupMembersMap={groupMembersMap}
        setGroupMembersMap={setGroupMembersMap}
      />
    </div>
  );
};

export default ChatUI;
