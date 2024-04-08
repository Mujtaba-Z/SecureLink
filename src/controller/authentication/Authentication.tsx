import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase.js';
import { setDoc, doc, updateDoc } from 'firebase/firestore';
import UserInformation from '../../model/UserInformation.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { encryptToken } from '../kdc/KDC.tsx';
import { generateKeys } from '../kdc/KDC.tsx';

const Login = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const token = user.accessToken;
        const { userKey } = generateKeys();
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('userKey', userKey);
        const encryptedToken = encryptToken({ userKey: userKey, token });
        await updateDoc(doc(db, 'users', user.uid), {
            accessToken: encryptedToken,
        });
        return token;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const Register = async (userInfo: UserInformation) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password);
        const user = userCredential.user;
        userInfo.employeeID = user.uid;

        userInfo.award = [];
        userInfo.awarded = false;

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
            awards: userInfo.awards, // Set awards to []
            awarded: userInfo.awarded // Set awarded to false
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