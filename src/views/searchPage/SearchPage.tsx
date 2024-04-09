import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Search } from '../../controller/search/Search';
import { createChat } from '../../controller/chat/Chat';
import CommunicationSession from '../../model/CommunicationSession';
import { getEmployeeID } from '../../controller/accountManager/AccountManager';

const SearchPage: React.FC = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredEmployees, setFilteredEmployees] = useState<any[]>([]);
  const [employeeID, setEmployeeID] = useState<string>('');

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      handleSearch(searchQuery);
    } else {
      setFilteredEmployees([]);
    }
  }, [searchQuery]);

  const handlePress = (destination: string) => {
    navigation.navigate(destination);
  };

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

  useEffect(() => {
    const fetchEmployeeID = async () => {
      const eID = await getEmployeeID(); 
      setEmployeeID(eID);
    }
    fetchEmployeeID();
    console.log("Employee ID:", employeeID);
  }, []);

  const handleMessage = async (employee: any) => {
    const currentUserId = employeeID;
    const employeeId = employee.employeeId;

    const sessionReg = new CommunicationSession(currentUserId, employeeId);
    console.log("employee messaged: " + employee)
    try {
    console.log("messaging: " + employee.employeeId)
      const chatDocRef = await createChat(sessionReg);
      if (chatDocRef.id) {
        navigation.navigate('ChatPage', { chatId: chatDocRef.id, chatName: employee.name });
      } else {
        console.error("Failed to navigate: No chatDocRef ID.");
      }
    } catch (error) {
      console.error("Failed to create chat:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Search Employees</Text>
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
  },
  text: {
    fontSize: 30,
    marginTop: 20,
    marginBottom: 20,
    color: '#333',
  },
  searchInput: {
    width: '90%',
    height: 50,
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 20,

  },
  employeeList: {
    flex: 1,
    width: '100%',
  },
  employeeItem: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  employeeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  employeeDepartment: {
    fontSize: 16,
    color: 'grey',
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
});

export default SearchPage;