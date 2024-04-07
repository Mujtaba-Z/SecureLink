import 'firebase/firestore';
import { db } from '../firebase.js';
import { getDocs, collection, where, query } from 'firebase/firestore';

export const DisplayChat = async (employeeID: String) => {

  try {
    // Query the chats collection to find all chats where the employee is a participant
    const chatsQuerySnapshot = await getDocs(query(collection(db, 'chats'), where('participants', 'array-contains', employeeID)));
    const chatNames = [];

    // Iterate over the query snapshot to extract chat names
    chatsQuerySnapshot.forEach(async (chatDoc) => {
      // For each chat, get the chat name and push it to the array
      const chatData = chatDoc.data();
      const chatNameDoc = await getDocs(doc(db, 'chats', chatDoc.id, 'chatName'));
      const chatName = chatNameDoc.exists() ? chatNameDoc.data().chatName : '';
      chatNames.push(chatName);
    });

    return chatNames;
  } catch (error) {
    console.error('Error fetching chats for employee:', error);
    return [];
  }
};
