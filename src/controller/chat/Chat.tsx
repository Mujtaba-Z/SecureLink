import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, updateDoc, getDocs, arrayUnion, doc, getDoc, setDoc } from 'firebase/firestore';
import { generateKeys, encryptSessionKey,encryptMessage, decryptMessage } from '../kdc/KDC';
import { getEmployeeName } from '../accountManager/AccountManager';

// Function to create a new chat
export const createChat = async (sessionData) => {
  try {

    // Check if a chat already exists between the two users
    const existingChat = await checkExistingChat(sessionData.chatter1, sessionData.chatter2);
    if (existingChat) {
      return false;
    }

    const session = {
      chatter1: sessionData.chatter1,
      chatter2: sessionData.chatter2
    };

    const employeeName = await getEmployeeName(session.chatter2);

    // Generate session key and encrypt it
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
      name: employeeName,
    });

    // add chat ID to chat documents
    const chatID = chatDocRef.id;
    const chatDoc = doc(db, 'chats', chatID);
    await updateDoc(chatDoc, {
      chatID: chatID,
    });

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

    return chatDocRef;
  } catch (error) {
    console.error("Failed to create chat:", error);
    return error;
  }
};

// Function to send a message in a chat
export const sendMessage = async (chatID, employee, message) => {
  try {

    // Get the chat document
    const chatDocRef = doc(db, 'chats', chatID);
    const chatDocSnapshot = await getDoc(chatDocRef);

    // Get the existing chat log and its size
    const existingChatLog = chatDocSnapshot.data().chatLog;
    const existingChatLogSize = Object.keys(existingChatLog).length;
    const timestamp = serverTimestamp();

    // Add the new message to the chat log
    let key = "chatLog";
    let data = {
      [existingChatLogSize+1]: { "sender": employee, "message": message, "timestamp": timestamp }
    }

    // Store the message in the chat log
    await setDoc(chatDocRef, {
      [key]: data
    }, { merge: true });
  } catch (error) {
    console.error("Failed to send message:", error);
    return error;
  }
};

// Function to retrieve chat data
export const fetchChatData = async (chatID) => {
  try {

    // Get the chat document
    const chatDocRef = doc(db, 'chats', chatID);
    const chatDocSnapshot = await getDoc(chatDocRef);
    const chatData = chatDocSnapshot.data().chatLog;
    const messagesArray = Object.values(chatData);

    return messagesArray;
  } catch (error) {
    console.error("Failed to fetch chat data:", error);
    return error;
  }
};

const checkExistingChat = async (chatter1, chatter2) => {
  try {

    // Get all chats from the database
    const querySnapshot = await getDocs(collection(db, 'chats'));
    let existingChat = false;

    // Iterate through each chat and check if it already exists
    querySnapshot.forEach((doc) => {
      const chatData = doc.data();
      if (
        (chatData.Chatter1 === chatter1 && chatData.Chatter2 === chatter2) ||
        (chatData.Chatter1 === chatter2 && chatData.Chatter2 === chatter1)
      ) {
        existingChat = true;
      }
    });

    return existingChat;
  } catch (error) {
    console.error("Error checking existing chat:", error);
    return false;
  }
};

