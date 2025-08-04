import { ref, onDisconnect, set } from "firebase/database";
import { doc, setDoc } from "firebase/firestore";
import { db, rtdb } from "./firebase"; // rtdb is Realtime DB, db is Firestore

export const setupPresence = async (username: string) => {
  const userStatusRef = ref(rtdb, `status/${username}`);
  const userDocRef = doc(db, "presence", username); // e.g., Firestore collection "presence"

  const isOffline = {
    online: false,
    lastSeen: new Date().toISOString(),
  };

  const isOnline = {
    online: true,
    lastSeen: new Date().toISOString(),
  };

  // Write online status to Firestore
  await setDoc(userDocRef, isOnline, { merge: true });

  // Set Realtime DB presence
  await set(userStatusRef, isOnline);
  onDisconnect(userStatusRef).set(isOffline);
};
