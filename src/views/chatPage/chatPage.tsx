import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { sendMessage,fetchChatData } from '../../controller/chat/Chat';

// Define the types for the route parameters
type ChatPageRouteParamList = {
  ChatPage: {
    chatId: string;
    chatName: string;
    employeeId: string;
    currentUserId: string;
  };
};

const ChatPage: React.FC = () => {

  // Get the route parameters
  const route = useRoute<RouteProp<ChatPageRouteParamList, 'ChatPage'>>();
  const { chatName, employeeId, currentUserId, chatId } = route.params;

  // State variables to store the message, and the list of messages
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  // Function to send a message
  const sendMessages = () => {
    if (message.trim().length > 0) {
      sendMessage(chatId,currentUserId,message);
      setMessages([...messages, message]);
      setMessage('');
    }
  };

  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.chatName}>{chatName}</Text>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Text style={styles.message}>{item}</Text>}
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
});

export default ChatPage;