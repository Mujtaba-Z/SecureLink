import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { sendMessage,fetchChatData } from '../../controller/chat/Chat';

// Define the types for the route parameters
type ChatPageRouteParamList = {
  ChatPage: {
    chatID: string;
    chatName: string;
    employeeId: string;
    currentUserId: string;
  };
};

const ChatPage: React.FC = () => {

  // Get the route parameters
  const route = useRoute<RouteProp<ChatPageRouteParamList, 'ChatPage'>>();
  const { chatName, employeeId, currentUserId, chatID } = route.params;

  // State variables to store the message, and the list of messages
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  // Function to send a message
  const sendMessages = () => {
    if (message.trim().length > 0) {
      sendMessage(chatID, currentUserId, message);
      setMessage('');
      fetchChat();
    }
  };
  
  const fetchChat = useCallback(async () => {
    const chatData = await fetchChatData(chatID);
    const messagesArray = Object.entries(chatData.chatLog).map(([key, value]) => {
      return {
        id: key, // Unique key for each message
        sender: value.sender,
        message: value.message,
      };
    });
    setMessages(messagesArray);
  }, [chatID]);

  // useEffect to get chat data
  useEffect(() => {
    fetchChat();

    // Set up interval to fetch chat every second
    const intervalId = setInterval(fetchChat, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [fetchChat]);


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.chatName}>{chatName}</Text>
      {/* Display the messages */}
      {messages.length === 0 && <Text>No messages yet</Text>}
      <FlatList
        data={messages}
        renderItem={({ item }) => (
        <View style={item.sender === currentUserId ? styles.currentUserMessageContainer : styles.employeeMessageContainer}>
          <Text style={styles.message}>{item.message}</Text>
        </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.messagesList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
          style={styles.input}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessages}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  chatName: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  messagesList: {
    flex: 1,
  },
  message: {
    backgroundColor: '#82b0f5',
    padding: 10,
    borderRadius: 10,
    marginVertical: 4,
    alignSelf: 'flex-end',
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  currentUserMessageContainer: {
    alignSelf: 'flex-end', // Aligns messages sent by the current user to the right side
    marginVertical: 4,
  },
  employeeMessageContainer: {
    alignSelf: 'flex-start', // Aligns messages sent by the employee to the left side
    marginVertical: 4,
  },
});

export default ChatPage;