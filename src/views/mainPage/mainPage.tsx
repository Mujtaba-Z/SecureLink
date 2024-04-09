import React, {useLayoutEffect, useEffect, useState} from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {db} from '../../controller/firebase.js';
import {getDocs, collection, onSnapshot, query} from 'firebase/firestore';
import { getEmployeeID } from '../../controller/accountManager/AccountManager.tsx';
import { get } from 'firebase/database';

const MainPage: React.FC = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [chats,setChats] = useState(null);
  const [employeeID, setEmployeeID] = useState("");


  const handleChatPress = (chatName: string) => {
    navigation.navigate('ChatPage', { chatName });
  };

  const handlePress = (screen: string) => {
    navigation.navigate(screen);
  };

    useEffect(() => {
      console.log("Fetching chats...");
      const fetchEmployeeID = async () => {
        const eID = await getEmployeeID(); 
        setEmployeeID(eID);
      }
      fetchEmployeeID(); // Call fetchProfile when component mounts
      console.log("Employee ID:", employeeID);
      const unsubscribe = onSnapshot(collection(db, "chats"), (querySnapShot) => {
        console.log("Query snapshot:", querySnapShot.docs);
        const chatRooms = querySnapShot.docs.map(doc => doc.data());
        console.log("All chat rooms:", chatRooms);
        const userChats = chatRooms.filter(room => {
            // Check if room.participants exists and is an array
            if (Array.isArray(room.participants)) {
                // Check if employeeID exists in the participants array
                return room.participants.includes(employeeID);
            } else {
                // Handle cases where participants array doesn't exist or is not in the expected format
                return false;
            }
        });        console.log("User's chats:", userChats);
        setChats(userChats);
        setIsLoading(false);
      });

      return unsubscribe;
    }, []);



//   const chats = [
//     { name: 'Chat 1', lastMessage: 'text', time: '3:45 PM' },
//     { name: 'Chat 2', lastMessage: 'Hi?', time: 'Yesterday' },
//     { name: 'Chat 3', lastMessage: 'fsao', time: '2 days ago' },
//   ];
//
//     useEffect(() => {
//       // Check if user is logged in
//       AsyncStorage.getItem('token').then((token) => {
//         if (!token) {
//           navigation.navigate('Login');
//         }
//       });
//     }, []);

  return (

    <SafeAreaView style={styles.container}>
    <SafeAreaView style={styles.rowContainer}>
      <Image source={require('../../assets/securelink-high-resolution-logo-black-transparent.png')} style={styles.mainPageLogo}/>
      <Text style={styles.text}>SecureLink</Text>
    </SafeAreaView>
      
    <>
      {chats && chats.length > 0 ? (
        <>
            {chats.map((room, index) => (
              <MessageCard key={room._id} room={room} index={index} />
            ))}
        </>
      ) : null}
    </>




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


const MessageCard = ({ room, index }) => {
  return (
    <TouchableOpacity style={styles.messageBox}>
      <Text style={styles.messageNumber}>{index + 1}</Text>
      <Text style={styles.messageText}>{room.lastMessage}</Text>
    </TouchableOpacity>
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
    messageBox: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    messageNumber: {
      fontWeight: 'bold',
      marginRight: 10,
    },
    messageText: {
      flex: 1,
    },
});

export default MainPage;