import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';

// Define the types for the route parameters
type ChatPageRouteParamList = {
  ChatPage: {
    chatName: string;
  };
};

const ChatPage: React.FC = () => {
  const route = useRoute<RouteProp<ChatPageRouteParamList, 'ChatPage'>>();
  const { chatName } = route.params;

  console.log("ChatPage mounted with chatName:", chatName);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = () => {
    if (message.trim().length > 0) {
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
        <Button title="Send" onPress={sendMessage} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  chatName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
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
});

export default ChatPage;
