import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DisplayChat } from '../../controller/displayChat/DisplayChat';
import { query } from 'firebase/firestore';

const MainPage: React.FC = () => {
  const navigation = useNavigation();
  const [employeeID, setEmployeeID] = useState<string>('example');


  useEffect(() => {
    if(employeeID !== ''){
      handleSearch(employeeID);
    }else{
      setChats([]);
    }
  }, [employeeID])

  const handleSearch = async (currEmployee: string) => {
//     try{
//       setEmployeeID(currEmployee);
//       if(currEmployee.trim() !== ''){
//         const results = await DisplayChat(currEmployee)
//         setChats(results);
//       }else{
//         setChats([])
//       }
//     } catch (error){
//       console.log(error)
//       setChats([]);
//     }
  }


  const handleChatPress = (chatName: string) => {
    navigation.navigate('ChatPage', { chatName });
  };

  const handlePress = (screen: string) => {
    navigation.navigate(screen);
  };

  const handleChatsFetched = (fetchedChats: any[]) => {
    setChats(fetchedChats);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.rowContainer}>
        <Image source={require('../../assets/securelink-high-resolution-logo-black-transparent.png')} style={styles.mainPageLogo}/>
        <Text style={styles.text}>SecureLink</Text>
      </SafeAreaView>
      
      <ScrollView>

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
      
      {/* Fetch chats */}
      <DisplayChat onChatsFetched={handleChatsFetched} />
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