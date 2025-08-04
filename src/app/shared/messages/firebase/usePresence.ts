import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { rtdb } from "./firebase";

export const useUserPresence = (usernames: string[]) => {
  const [statusMap, setStatusMap] = useState<Record<string, { online: boolean; lastSeen: string }>>({});

  useEffect(() => {
    const unsubscribers: (() => void)[] = [];

    usernames.forEach((name) => {
      const userRef = ref(rtdb, `status/${name}`);
      const unsubscribe = onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setStatusMap((prev) => ({
            ...prev,
            [name]: {
              online: data.online,
              lastSeen: data.lastSeen,
            },
          }));
        }
      });

      // `onValue` returns an unsubscribe function, so just store that
      unsubscribers.push(unsubscribe);
    });

    // Cleanup: call each unsubscribe function
    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
    };
  }, [usernames]);

  return statusMap;
};
