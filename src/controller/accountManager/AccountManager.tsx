import AsyncStorage from '@react-native-async-storage/async-storage';
import UserInformation from '../../model/UserInformation.js';
import {db} from '../firebase.js';
import {getDocs, collection, updateDoc, deleteDoc} from 'firebase/firestore';
import { decryptToken } from '../kdc/KDC.tsx';
import firebase from 'firebase/compat/app';

// Function to get account details
const getAccountDetails = async () => {
    try {

        // Get the user's key and token
        const userKey = await AsyncStorage.getItem('userKey');
        const token = await AsyncStorage.getItem('token');

        // Get all users from the database
        const querySnapshot = await getDocs(collection(db, 'users'));
        let result = null;

        // Iterate through each user and check if their token matches the user's token
        await Promise.all(querySnapshot.docs.map(async (doc) => {
            const userData = doc.data();
            if (userData.accessToken) {
                const decryptedToken = await decryptToken({ userKey: userKey, encryptedToken: userData.accessToken });
                if (decryptedToken === token) {

                    // If the tokens match, set the result to the user's data
                    result = {
                        employeeID: userData.employeeID,
                        name: userData.name,
                        section: userData.section,
                        email: userData.email,
                        title: userData.title,
                        phone: userData.phone,
                        team: userData.team,
                        dateOfBirth: userData.dateOfBirth,
                        leaderboardPoints: userData.leaderboardPoints,
                    };
                }
            }
        }));
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Function to get the name of an employee
const getEmployeeName = async (employeeID: string) => {
    try {

        // Get all users from the database
        const querySnapshot = await getDocs(collection(db, 'users'));
        let result = null;

        // Iterate through each user and check if their employee ID matches the given employee ID
        for (const doc of querySnapshot.docs) {
            const userData = doc.data();
            if (userData.employeeID === employeeID) {
                result = userData.name;
                break;
            }
        }
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Function to get the employee ID of the current user
const getEmployeeID = async () => {
    try {

        // Get the user's key and token
        const userKey = await AsyncStorage.getItem('userKey');
        const token = await AsyncStorage.getItem('token');

        // Get all users from the database
        const querySnapshot = await getDocs(collection(db, 'users'));
        let result = null;

        // Iterate through each user and check if their token matches the user's token
        await Promise.all(querySnapshot.docs.map(async (doc) => {
            const userData = doc.data();
            if (userData.accessToken) {

                // Decrypt the user's token
                const decryptedToken = await decryptToken({ userKey: userKey, encryptedToken: userData.accessToken });
                if (decryptedToken === token) {
                    // If the tokens match, set the result to the user's employee ID
                    result = userData.employeeID;
                }
            }
        }));
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
    


// Function to change the job title of an employee
const changeJobTitle = async (employeeID: string, newTitle: string) => {
    try {
        
        // Get all users from the database
        const querySnapshot = await getDocs(collection(db, 'users'));
        querySnapshot.forEach((doc) => {
            const userData = doc.data();

            // Check if the employee ID matches the given employee ID
            if (userData.employeeID === employeeID) {
                const docRef = doc.ref;

                // Update the user's job title
                updateDoc(docRef, {
                    title: newTitle,
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
};

// Function to change the company section of an employee
const changeCompanySection = async (employeeID: string, newSection: string) => {
    try {

        // Get all users from the database
        const querySnapshot = await getDocs(collection(db, 'users'));
        querySnapshot.forEach((doc) => {
            const userData = doc.data();

            // Check if the employee ID matches the given employee ID
            if (userData.employeeID === employeeID) {
                const docRef = doc.ref;

                // Update the user's company section
                updateDoc(docRef, {
                    section: newSection,
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
};

// Function to change the phone number of an employee
const changePhone = async (employeeID: string, newPhone: string) => {
    try {

        // Get all users from the database
        const querySnapshot = await getDocs(collection(db, 'users'));
        querySnapshot.forEach((doc) => {
            const userData = doc.data();

            // Check if the employee ID matches the given employee ID
            if (userData.employeeID === employeeID) {
                const docRef = doc.ref;

                // Update the user's phone number
                updateDoc(docRef, {
                    phone: newPhone,
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
};

// Function to change the team name of an employee
const changeTeamName = async (employeeID: string, newTeam: string) => {
    try {

        // Get all users from the database
        const querySnapshot = await getDocs(collection(db, 'users'));
        querySnapshot.forEach((doc) => {
            const userData = doc.data();

            // Check if the employee ID matches the given employee ID
            if (userData.employeeID === employeeID) {
                const docRef = doc.ref;

                // Update the user's team name
                updateDoc(docRef, {
                    team: newTeam,
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
};

// Function to delete an account
const deleteAccount = async (employeeID: string, email: string, password: string) => {
    try {

        // Get all users from the database
        const querySnapshot = await getDocs(collection(db, 'users'));
        querySnapshot.forEach(async (doc) => {
            const userData = doc.data();

            // Check if the employee ID, email, and password match the given values
            if (userData.employeeID === employeeID) {
                if (userData.email === email && userData.password === password) {

                    // Delete the user's document
                    const user = firebase.auth().currentUser;
                    if (user) {
                        await user.delete();
                    }
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
};

// Function to change the team manager of an employee
const changeTeamManager = async (employeeID: string, newManager: UserInformation) => {
    try {

        // Get all users from the database
        const querySnapshot = await getDocs(collection(db, 'users'));
        querySnapshot.forEach((doc) => {
            const userData = doc.data();

            // Check if the employee ID matches the given employee ID
            if (userData.employeeID === employeeID) {

                // Update the user's team manager
                updateDoc(doc, {
                    teamManager: newManager,
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
};

export { getAccountDetails, changeCompanySection, changePhone, changeTeamName, deleteAccount, changeTeamManager, changeJobTitle, getEmployeeName, getEmployeeID };