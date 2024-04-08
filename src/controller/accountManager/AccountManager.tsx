import AsyncStorage from '@react-native-async-storage/async-storage';
import UserInformation from '../../model/UserInformation.js';
import {db} from '../firebase.js';
import {getDocs, collection, updateDoc} from 'firebase/firestore';
import { decryptToken } from '../kdc/KDC.tsx';

const getAccountDetails = async () => {
    try {
        const userKey = await AsyncStorage.getItem('userKey');
        const token = await AsyncStorage.getItem('token');
        const querySnapshot = await getDocs(collection(db, 'users'));
        let result = {};
        
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            if (userData.accessToken) {
                const decryptedToken = decryptToken({ userKey: userKey, encryptedToken: userData.accessToken});
                const verification = decryptedToken === token;
                if (verification) {
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
         });
        return result;
    } catch (error) {
        console.log(error);
        return {};
    }
};


const changeJobTitle = async (employeeID: string, newTitle: string) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            if (userData.employeeID === employeeID) {
                const docRef = doc.ref;
                updateDoc(docRef, {
                    title: newTitle,
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
};

const changeCompanySection = async (employeeID: string, newSection: string) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            if (userData.employeeID === employeeID) {
                const docRef = doc.ref;
                updateDoc(docRef, {
                    section: newSection,
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
};

const changePhone = async (employeeID: string, newPhone: string) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            if (userData.employeeID === employeeID) {
                const docRef = doc.ref;
                updateDoc(docRef, {
                    phone: newPhone,
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
};

const changeTeamName = async (employeeID: string, newTeam: string) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            if (userData.employeeID === employeeID) {
                const docRef = doc.ref;
                updateDoc(docRef, {
                    team: newTeam,
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteAccount = async (employeeID: string, email: string, password: string) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            if (userData.employeeID === employeeID) {
                if (userData.email === email && userData.password === password) {
                    doc.delete();
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
};

const changeTeamManager = async (employeeID: string, newManager: UserInformation) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            if (userData.employeeID === employeeID) {
                updateDoc(doc, {
                    teamManager: newManager,
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
};

export { getAccountDetails, changeCompanySection, changePhone, changeTeamName, deleteAccount, changeTeamManager, changeJobTitle };