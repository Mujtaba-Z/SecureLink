import React, {useEffect} from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainPage: React.FC = () => {
  const navigation = useNavigation();

  const handleChatPress = (chatName: string) => {
    navigation.navigate('ChatPage', { chatName });
  };

  const handlePress = (screen: string) => {
    navigation.navigate(screen);
  };

  const chats = [
    { name: 'Chat 1', lastMessage: 'text', time: '3:45 PM' },
    { name: 'Chat 2', lastMessage: 'Hi?', time: 'Yesterday' },
    { name: 'Chat 3', lastMessage: 'fsao', time: '2 days ago' },
  ];

    useEffect(() => {
      // Check if user is logged in
      AsyncStorage.getItem('token').then((token) => {
        if (!token) {
          navigation.navigate('Login');
        }
      });
    }, []);

  return (
    <SafeAreaView style={styles.container}>
    <SafeAreaView style={styles.rowContainer}>
      <Image source={require('../../assets/securelink-high-resolution-logo-black-transparent.png')} style={styles.mainPageLogo}/>
      <Text style={styles.text}>SecureLink</Text>
    </SafeAreaView>
      
      <ScrollView style={styles.chatList}>
        {chats.map((chat, index) => (
          <TouchableOpacity key={index} onPress={() => handleChatPress(chat.name)} style={styles.chatItem}>
            <Text style={styles.chatName}>{chat.name}</Text>
            <Text style={styles.lastMessage}>{chat.lastMessage}</Text>
            <Text style={styles.time}>{chat.time}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* Bottom Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton} onPress={() => handlePress('Home')}>
          <Text style={styles.navBarText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => handlePress('Search')}>
          <Text style={styles.navBarText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => handlePress('Profile')}>
          <Text style={styles.navBarText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => handlePress('Leaderboard')}>
          <Text style={styles.navBarText}>Leaderboard</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Update StyleSheet to define styles
const styles = StyleSheet.create({
  container: {
  padding: 10,
    flex: 1,
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainPageLogo: {
    marginTop: 20,
    width: 50,
    height: 50,
  },
  text: {
    fontSize: 38,
    marginTop: 35,
    marginBottom: 20,
    color: '#333',
  },
  chatList: {
    flex: 1,
    width: '100%',
  },
  chatItem: {
    padding: 20,
    borderTopWidth: 2,
    borderTopColor: '#333',
  },
  chatName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
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
  navBarText: {
    fontSize: 20,
    color: '#333',
  },
});

export default MainPage;