import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Search } from '../../controller/search/Search';
import { createChat } from '../../controller/chat/Chat';
import { getEmployeeID } from '../../controller/accountManager/AccountManager.tsx';
import CommunicationSession from '../../model/CommunicationSession.js';

const SearchPage: React.FC = () => {
  const navigation = useNavigation();

  // State variables to store search query and filtered employees, and error message
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredEmployees, setFilteredEmployees] = useState<any[]>([]);
  const [employeeID, setEmployeeID] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // useEffect to handle search query changes
  useEffect(() => {
    if (searchQuery.trim() !== '') {
      handleSearch(searchQuery);
    } else {
      setFilteredEmployees([]);
    }
  }, [searchQuery]);

  // function for navigating to different screens
  const handlePress = (destination: string) => {
    navigation.navigate(destination);
  };

  // function to handle search
  const handleSearch = async (query: string) => {
    try {
      setSearchQuery(query);
      if (query.trim() !== '') {
        const results = await Search(query);
        setFilteredEmployees(results);
      } else {
        setFilteredEmployees([]);
      }
    } catch (error) {
      console.log(error);
      setFilteredEmployees([]);
    }
  };

  // useEffect to get employee ID only once
  useEffect(() => {
    const fetchEmployeeID = async () => {
      const eID = await getEmployeeID(); 
      setEmployeeID(eID);
    }
    fetchEmployeeID();
  }, []);

  // function to handle messaging
  const handleMessage = async (employee: any) => {

    const currentUserId = employeeID;
    const employeeId = employee.employeeId;

    // Create a new chat session
    const sessionReg = new CommunicationSession(currentUserId, employeeId);
    try {
      const chatDocRef = await createChat(sessionReg);

      // If chat already exists, show an error message
      if (chatDocRef === false) {
        setErrorMessage("Chat Already Exists!");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        return;
      }

      // Navigate to the chat page
      if (chatDocRef.id) {

        navigation.navigate('ChatPage', { chatId: chatDocRef.id, chatName: employee.name, employeeId: employeeId, currentUserId: currentUserId});
      } else {
        console.error("Failed to navigate: No chatDocRef ID.");
      }
    } catch (error) {
      console.error("Failed to create chat:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Employees"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <ScrollView style={styles.employeeList}>
  {filteredEmployees.map((employee, index) => (
    <View key={index} style={styles.employeeItem}>
      <Text style={styles.employeeName}>{employee.name}</Text>
      <Text style={styles.employeeDepartment}>{employee.email}</Text>
      <Text style={styles.employeeDepartment}>{employee.section}</Text>
      <Text style={styles.employeeDepartment}>{employee.title}</Text>
      <TouchableOpacity style={styles.messageButton} onPress={() => handleMessage(employee)}>
        <Text style={styles.messageButtonText}>Message</Text>
      </TouchableOpacity>
    </View>
  ))}
      {/* Timed error message */}
      {errorMessage && (
        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorMessageText}>{errorMessage}</Text>
        </View>
      )}
</ScrollView>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  searchInput: {
    marginTop: 20,
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 18,
    backgroundColor: '#fff',
  },
  employeeList: {
    flex: 1,
    width: '100%',
    marginBottom: 10,
  },
  employeeItem: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  employeeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  employeeDetails: {
    fontSize: 16,
    color: '#666',
  },
  messageButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  messageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
  errorMessageContainer: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  errorMessageText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SearchPage;