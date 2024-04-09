import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase.js';
import { setDoc, doc, updateDoc } from 'firebase/firestore';
import UserInformation from '../../model/UserInformation.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { encryptToken } from '../kdc/KDC.tsx';
import { generateKeys } from '../kdc/KDC.tsx';

// Function to log in a user
const Login = async (email: string, password: string) => {
    try {

        // Sign in with email and password
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const token = user.accessToken;

        // Generate keys for the user
        const { userKey } = await generateKeys();
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('userKey', userKey);
        await AsyncStorage.setItem('employeeID', user.uid);

        // Encrypt the token and update the user's document in the database
        const encryptedToken = await encryptToken({ userKey: userKey, token });
        await updateDoc(doc(db, 'users', user.uid), {
            accessToken: encryptedToken,
        });
        return token;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Function to register a new user
const Register = async (userInfo: UserInformation) => {
    try {
        
        // Create a new user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password);
        const user = userCredential.user;
        userInfo.employeeID = user.uid;

        // Set the user's data in the database
        await setDoc(doc(db, 'users', user.uid), {
            email: userInfo.email,
            employeeID: userInfo.employeeID,
            name: userInfo.name,
            section: userInfo.section,
            title: userInfo.title,
            phone: userInfo.phoneNum,
            dateOfBirth: userInfo.DOB,
            team: userInfo.teamName,
            leaderboardPoints: userInfo.leaderboardPoints,
        });
        const token = user.accessToken;
        await AsyncStorage.setItem('token', token);
        return token;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export { Login, Register };