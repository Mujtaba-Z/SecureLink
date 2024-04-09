import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, updateDoc, getDocs } from 'firebase/firestore';
import { generateKeys, encryptSessionKey } from '../kdc/KDC';

// Function to create a new chat
export const createChat = async (sessionData) => {
  try {
    const session = {
      chatter1: sessionData.chatter1,
      chatter2: sessionData.chatter2
    };

    const { userKey } = await generateKeys();
    const sessionName = session.chatter1 + session.chatter2;
    const encryptedSession = await encryptSessionKey({ sessionKey: userKey , session: sessionName });
    
    // Add chat document
    const chatDocRef = await addDoc(collection(db, 'chats'), {
      Chatter1: session.chatter1,
      Chatter2: session.chatter2,
      chatLog: [],
      creationTime: serverTimestamp(),
      encryptionSession: encryptedSession,
    });
    console.log("New chat created with ID:", chatDocRef.id);

    // Update user documents with session key
    const querySnapshot = await getDocs(collection(db, 'users'));
    querySnapshot.forEach(async (doc) => {
      const userData = doc.data();
      if (userData.employeeID === session.chatter1 || userData.employeeID === session.chatter2) {
        const docRef = doc.ref;
        // Get the existing sessionKeys array or initialize as an empty array
        const sessionKeys = userData.sessionKeys || [];
        // Append the new key to the sessionKeys array
        const updatedSessionKeys = [...sessionKeys, userKey];
        await updateDoc(docRef, {
          sessionKeys: updatedSessionKeys,
        });
      }
    });

    console.log("New chat created with ID:", chatDocRef.id);
    return chatDocRef;
  } catch (error) {
    console.error("Failed to create chat:", error);
    return error;
  }
};
