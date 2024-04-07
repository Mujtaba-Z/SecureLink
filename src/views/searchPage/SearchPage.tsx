import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Search } from '../../controller/search/Search';

const SearchPage: React.FC = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredEmployees, setFilteredEmployees] = useState<any[]>([]);

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

  const handleMessage = (employee: any) => {
    console.log("Message button pressed for employee:", employee);
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
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => handlePress('Search')}>
          <Text>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => handlePress('Profile')}>
          <Text>Profile</Text>
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
  },
  searchInput: {
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  employeeList: {
    flex: 1,
    width: '100%',
  },
  employeeItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  employeeName: {
    fontSize: 20,
    fontWeight: 'bold',
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
