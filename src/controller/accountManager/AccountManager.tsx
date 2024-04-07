import UserInformation from '../../model/UserInformation.js';
import {db} from '../firebase.js';
import {getDocs, collection, setDoc} from 'firebase/firestore';

const getAccountDetails = async (employeeID: string) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        let result = {};
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            if (userData.employeeID === employeeID) {
                result = {
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
                userData.title = newTitle;
                setDoc(doc, userData);
            }
        });
    } catch (error) {
        console.log(error);
    }
};

const changeComapanySection = async (employeeID: string, newSection: string) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            if (userData.employeeID === employeeID) {
                userData.section = newSection;
                setDoc(doc, userData);
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
                userData.phone = newPhone;
                setDoc(doc, userData);
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
                userData.team = newTeam;
                setDoc(doc, userData);
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
                userData.teamManager = newManager;
                setDoc(doc, userData);
            }
        });
    } catch (error) {
        console.log(error);
    }
};

export {getAccountDetails, getAllAccountDetails, changeComapanySection, changePhone, changeTeamName, deleteAccount, changeTeamManager};