// Import the necessary Firebase modules
import {db} from '../firebase';
import {collection, addDoc, serverTimestamp} from 'firebase/firestore';

/**
 * Creates a new chat between two users.
 * @param currentUserId The ID of the current user.
 * @param employeeId The ID of the employee with whom the chat is to be started.
 * @returns The document reference of the new chat or an error object.
 */
export const createChat = async (currentUserId: string, employeeId: string) => {
  try {
    // Create a new chat document in the 'chats' collection
    console.log("Creating chat with:", currentUserId, employeeId);

    const chatDocRef = await addDoc(collection(db, 'chats'), {

      participants: [currentUserId, employeeId], // Use test values
      timestamp: serverTimestamp(),
    });
    console.log("New chat created with ID:", chatDocRef.id);
    return chatDocRef;
  } catch (error) {
    console.error("Failed to create chat:", error);
    return error;
  }
};
