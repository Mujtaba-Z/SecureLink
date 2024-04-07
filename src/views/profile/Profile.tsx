import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAccountDetails, changeComapanySection, changeJobTitle, changePhone, changeTeamName } from '../../controller/accountManager/AccountManager.tsx';

const ProfilePage: React.FC = () => {
  const navigation = useNavigation();
  const [profileDetails, setProfileDetails] = useState<any>({}); // useState to keep profile details
  const [editableFields, setEditableFields] = useState<any>({
    jobTitle: '',
    companySection: '',
    phone: '',
    team: ''
  }); // useState for editable field values
  
  // useEffect to get profile details only once
  useEffect(() => {
    async function fetchProfile() {
      const details = await getAccountDetails(); // Fetch profile details
      setProfileDetails(details);
    }
    fetchProfile(); // Call fetchProfile when component mounts
  }, []); // Empty dependency array ensures the effect runs only once

  // function for navigating to different screens
  const handlePress = (destination: string) => {
    navigation.navigate(destination);
  };

  // function for updating profile details
  const handleUpdateField = async (field: string) => {
    try {const value = editableFields[field];
    switch (field) {
      case 'jobTitle':
        await changeJobTitle(profileDetails.employeeID, value);
        break;
      case 'companySection':
        await changeComapanySection(profileDetails.employeeID, value);
        break;
      case 'phone':
        await changePhone(profileDetails.employeeID, value);
        break;
      case 'team':
        await changeTeamName(profileDetails, value);
        break;
      default:
        break;
    }
    // update profile details after change
    const updatedDetails = await getAccountDetails();
    setProfileDetails(updatedDetails);
    }

    catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Profile</Text>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.detailsContainer}>
          {/* First, these details are not changeable */}
          <Text style={styles.label}>EmployeeID:</Text>
          <Text>{profileDetails.employeeID}</Text>
          <Text style={styles.label}>Name:</Text>
          <Text>{profileDetails.name}</Text>
          <Text style={styles.label}>Email:</Text>
          <Text>{profileDetails.email}</Text>
          <Text style={styles.label}>Date of Birth:</Text>
          <Text>{profileDetails.dateOfBirth}</Text>
          
          {/* next details are changeable */}
          
          <Text style={styles.label}>Phone:</Text>
          <View style={styles.fieldContainer}>
            <TextInput
              style={styles.input}
              placeholder='Phone'
              onChangeText={(text) => setEditableFields({ ...editableFields, phone: text })}
            />
            <TouchableOpacity onPress={() => handleUpdateField('phone')}>
              <Text style={styles.updateButton}>Update</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Job Title:</Text>
          <View style={styles.fieldContainer}>
            <TextInput
              style={styles.input}
              placeholder='Title'
              onChangeText={(text) => setEditableFields({ ...editableFields, jobTitle: text })}
            />
            <TouchableOpacity onPress={() => handleUpdateField('jobTitle')}>
              <Text style={styles.updateButton}>Update</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Section:</Text>
          <View style={styles.fieldContainer}>
            <TextInput
              style={styles.input}
              placeholder='Section'
              onChangeText={(text) => setEditableFields({ ...editableFields, companySection: text })}
            />
            <TouchableOpacity onPress={() => handleUpdateField('companySection')}>
              <Text style={styles.updateButton}>Update</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Team:</Text>
          <View style={styles.fieldContainer}>
            <TextInput
              style={styles.input}
              placeholder='Team'
              onChangeText={(text) => setEditableFields({ ...editableFields, team: text })}
            />
            <TouchableOpacity onPress={() => handleUpdateField('team')}>
              <Text style={styles.updateButton}>Update</Text>
            </TouchableOpacity>
          </View>

        </View>
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
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  detailsContainer: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 10,
    marginVertical: 10,
  },
  updateButton: {
    color: 'blue',
    fontSize: 16,
  },
  navButton: {
    padding: 10,
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
});

export default ProfilePage;
