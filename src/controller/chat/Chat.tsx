// chat.tsx

import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const createChat = async (currentUserId: string, employeeId: string) => {
  try {
    // Create a new chat document in the 'chats' collection
    const chatDocRef = await addDoc(collection(db, 'chats'), {
      participants: [currentUserId, employeeId],
      timestamp: serverTimestamp(),
    });
    console.log("New chat created with ID:", chatDocRef.id);
    return chatDocRef;
  } catch (error) {
    console.error("Failed to create chat:", error);
    return error;
  }
};
