import React from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';

const MainPage: React.FC = () => {
  const handlePress = (buttonName: string) => {
    console.log(`${buttonName} button pressed`);
    // Here you can handle navigation or any other action
  };

  // Example chat data
  const chats = [
    { name: 'Chat 1', lastMessage: 'text', time: '3:45 PM' },
    { name: 'Chat 2', lastMessage: 'Hi?', time: 'Yesterday' },
    { name: 'Chat 3', lastMessage: 'yo', time: '2 days ago' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>SecureLink</Text>
      {/* Chat List Section */}
      <ScrollView style={styles.chatList}>
        {chats.map((chat, index) => (
          <View key={index} style={styles.chatItem}>
            <Text style={styles.chatName}>{chat.name}</Text>
            <Text style={styles.lastMessage}>{chat.lastMessage}</Text>
            <Text style={styles.time}>{chat.time}</Text>
          </View>
        ))}
      </ScrollView>
      {/* Bottom Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton} onPress={() => handlePress('Profile')}>
          <Text>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => handlePress('Search')}>
          <Text>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => handlePress('Settings')}>
          <Text>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Update StyleSheet to define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    marginTop: 20,
  },
  chatList: {
    flex: 1,
    width: '100%',
  },
  chatItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  chatName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 16,
    color: 'grey',
  },
  time: {
    fontSize: 14,
    color: 'grey',
    textAlign: 'right',
    position: 'absolute',
    right: 20,
    top: 20,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  navButton: {
    padding: 10,
  },
});

export default MainPage;