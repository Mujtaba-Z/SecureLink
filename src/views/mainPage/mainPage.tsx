import React, {useLayoutEffect, useEffect, useState} from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {db} from '../../controller/firebase.js';
import {getDocs, collection, onSnapshot, query} from 'firebase/firestore';

const MainPage: React.FC = () => {
  const navigation = useNavigation();

  // Use state to keep track of loading state, chats, and employee ID
  const [isLoading, setIsLoading] = useState(true);
  const [chats,setChats] = useState(null);
  const [employeeID, setEmployeeID] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");


  // function for navigating to different screens
  const handleChatPress = (chatName: string, chatter2: string, chatID: string ) => {
    navigation.navigate('ChatPage', { chatId: chatID, chatName: chatName, employeeId: chatter2, currentUserId: employeeID});
  };

  // function for navigating to different screens
  const handlePress = (screen: string) => {
    navigation.navigate(screen);
  };

    // useEffect to get profile details only once
    useEffect(() => {
      // Get the employee ID from AsyncStorage
      AsyncStorage.getItem('employeeID').then((id) => {
        if (id) {
          setEmployeeID(id);
        } else {
          console.log("Employee ID not found");
        }
      });
    }, []);

    // useEffect to get chat rooms
    useEffect(() => {
      if (employeeID) {
        const unsubscribe = onSnapshot(collection(db, "chats"), (querySnapShot) => {
          const chatRooms = querySnapShot.docs.map(doc => doc.data());
          const availableChats = [];
          const userChats = chatRooms.filter(room => {
            if(room.Chatter1 === employeeID || room.Chatter2 === employeeID){

            availableChats.push(room);
          }
            if(room.Chatter1 === employeeID){
              setCurrentUserId(room.Chatter1);
            } else if(room.Chatter2 === employeeID){
              setCurrentUserId(room.Chatter2);
            }
            return room.Chatter1 === employeeID || room.Chatter2 === employeeID;
          });       
          setChats(availableChats);
          console.log(chats);
          setIsLoading(false);
        });
        return unsubscribe;
      }
    }, [employeeID]);


  return (
    <SafeAreaView style={styles.container}>
    <SafeAreaView style={styles.rowContainer}>
      <Image source={require('../../assets/securelink-high-resolution-logo-black-transparent.png')} style={styles.mainPageLogo}/>
      <Text style={styles.text}>SecureLink</Text>
    </SafeAreaView>
      
      {/* Chat List */}
    <>
    {chats && chats.length > 0 ? (
  <>
      {chats.map((room, index) => (
        <MessageCard 
        key={`${room.Chatter1}-${room.Chatter2}`} 
        room={room} 
        index={index} 
        employeeID={employeeID} 
        handleChatPress={() => handleChatPress(room.name, currentUserId, room.id)}
      />
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

// MessageCard component
const MessageCard = ({ room, index, employeeID, handleChatPress }) => {
  return (
    <TouchableOpacity style={styles.messageBox} onPress={() => handleChatPress(room.name)}>
      <Text style={styles.messageNumber}>{index + 1}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.messageName}>{room.name}</Text>
        <Text style={styles.messageText}>{room.Chatter1 === employeeID ? room.Chatter2 : room.Chatter1}</Text>
      </View>
    </TouchableOpacity>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f8f8f8', 
  },
  rowContainer: {
    marginTop: 20, 
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  mainPageLogo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  text: {
    fontSize: 32,
    color: '#333',
    fontWeight: 'bold', 
  },
  chatList: {
    flex: 1,
    width: '100%',
    marginTop: 20, 
  },
  messageBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20, 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    marginBottom: 10, 
    elevation: 2, 
    shadowColor: '#000', 
    shadowOpacity: 0.2, 
    shadowRadius: 3, 
    shadowOffset: { width: 0, height: 2 }, 
  },
  messageNumber: {
    fontSize: 18, 
    fontWeight: 'bold', 
    marginRight: 10,
    color: '#333', 
  },
  messageName: {
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#333', 
  },
  messageText: {
    flex: 1,
    fontSize: 14, 
    color: '#666', 
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
  },
  navButton: {
    paddingHorizontal: 20, 
  },
  navBarText: {
    fontSize: 16,
    color: '#333',
  },
});


export default MainPage;