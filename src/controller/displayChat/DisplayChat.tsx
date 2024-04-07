import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
}

interface DisplayChatProps {
  onChatsFetched: (chats: Chat[]) => void;
}

const DisplayChat: React.FC<DisplayChatProps> = ({ onChatsFetched }) => {
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const currentUserID = firebase.auth().currentUser?.uid;
        if (currentUserID) {
          const chatsRef = firebase.firestore().collection('chats').where('members', 'array-contains', currentUserID);
          const querySnapshot = await chatsRef.get();
          const fetchedChats = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Chat);
          onChatsFetched(fetchedChats);
        }
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();

    // Cleanup function
    return () => {};
  }, [onChatsFetched]);

  return null; // Since this component only fetches data, it doesn't render anything directly
};

export default DisplayChat;
