import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, TextInput, ScrollView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAccountDetails, changeCompanySection, changeJobTitle, changePhone, changeTeamName, deleteAccount } from '../../controller/accountManager/AccountManager.tsx';

const ProfilePage: React.FC = () => {
  const navigation = useNavigation();

  // State variables to store profile details and editable fields
  const [profileDetails, setProfileDetails] = useState<any>({}); 
  const [verificationModalVisible, setVerificationModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [editableFields, setEditableFields] = useState<any>({
    jobTitle: '',
    companySection: '',
    phone: '',
    team: ''
  }); 
  
  // useEffect to get profile details only once
  useEffect(() => {
    async function fetchProfile() {
      const details = await getAccountDetails(); 
      setProfileDetails(details);
    }
    fetchProfile();
  }, []);

  // function for navigating to different screens
  const handlePress = (destination: string) => {
    navigation.navigate(destination);
  };

  // function for updating profile details
  const handleUpdateField = async (field: string) => {
    try {
      const value = editableFields[field];
      switch (field) {
        case 'jobTitle':
          await changeJobTitle(profileDetails.employeeID, value);
          break;
        case 'companySection':
          await changeCompanySection(profileDetails.employeeID, value);
          break;
        case 'phone':
          await changePhone(profileDetails.employeeID, value);
          break;
        case 'team':
          await changeTeamName(profileDetails.employeeID, value);
          break;
        default:
          break;
      }
      // update profile details after change
      const updatedDetails = await getAccountDetails();
      setProfileDetails(updatedDetails);
    } catch (error) {
      console.log(error);
    }
  };

 // function for deleting the account
 const handleDeleteAccount = async () => {
  setVerificationModalVisible(true);
};

const handleDeleteConfirmation = async () => {
  try {
    await deleteAccount(profileDetails.employeeID, email, password);
    // Navigate to some initial screen after account deletion
    navigation.navigate('Login');
  } catch (error) {
    console.log(error);
  }
  setVerificationModalVisible(false);
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        <ScrollView style={styles.scrollContainer}>

        {/* First, these details are not changeable */}

          <View style={styles.detailsContainer}>
            <Text style={styles.header}>Profile</Text>
            <View style={styles.details}>
              <Text style={styles.label}>Employee ID:</Text>
              <Text style={styles.text}>{profileDetails.employeeID}</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.text}>{profileDetails.name}</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.text}>{profileDetails.email}</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.label}>Date of Birth:</Text>
              <Text style={styles.text}>{profileDetails.dateOfBirth}</Text>
            </View>

            {/* next details are changeable */}

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone:</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder='Phone'
                  onChangeText={(text) => setEditableFields({ ...editableFields, phone: text })}
                />
                <TouchableOpacity onPress={() => handleUpdateField('phone')}>
                  <Text style={styles.updateButton}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Job Title:</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder='Title'
                  onChangeText={(text) => setEditableFields({ ...editableFields, jobTitle: text })}
                />
                <TouchableOpacity onPress={() => handleUpdateField('jobTitle')}>
                  <Text style={styles.updateButton}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Section:</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder='Section'
                  onChangeText={(text) => setEditableFields({ ...editableFields, companySection: text })}
                />
                <TouchableOpacity onPress={() => handleUpdateField('companySection')}>
                  <Text style={styles.updateButton}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Team:</Text>
              <View style={styles.inputWrapper}>
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
            
             {/* Awards details */}
             
            <Text style={styles.label}>Leaderboard Points:</Text>
            <Text style={styles.text}>{profileDetails.leaderboardPoints}</Text>
          </View>

          {/* Delete Account Button */}
          <TouchableOpacity onPress={handleDeleteAccount} style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>

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

      {/* Verification Modal */}
      <Modal visible={verificationModalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirm Deletion</Text>
            <TextInput
              style={styles.inputConfirm}
              placeholder="Enter Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.inputConfrim}
              placeholder="Enter Password"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleDeleteConfirmation}>
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setVerificationModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  background: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  details: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  updateButton: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
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
    padding: 10,
  },
  navButton: {
    padding: 10,
  },
  navBarText: {
    fontSize: 16,
    color: '#333',
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'blue',
    flex: 1,
    margin: 5,
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  modalButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inputConfirm: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default ProfilePage;
