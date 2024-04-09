import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Search } from '../../controller/search/Search';
import { createChat } from '../../controller/chat/Chat';
import { getEmployeeID } from '../../controller/accountManager/AccountManager.tsx';

const SearchPage: React.FC = () => {
  const navigation = useNavigation();

  // State variables to store search query and filtered employees
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredEmployees, setFilteredEmployees] = useState<any[]>([]);
  const [employeeID, setEmployeeID] = useState("");

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

  // function to handle messaging
  const handleMessage = async (employee: any) => {

    const fetchEmployeeID = async () => {
        const eID = await getEmployeeID();
        setEmployeeID(eID);
    }

    fetchEmployeeID()
    console.log("EMPLOYEE ID IN SEARCHPAGE: " + employeeID)
    const otherEmployeeId = employee.employeeId;
    console.log("employee messaged: " + employee)
    try {
    console.log("messaging: " + otherEmployeeId)
      const chatDocRef = await createChat(employeeID, otherEmployeeId);
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

// Update StyleSheet to define styles
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