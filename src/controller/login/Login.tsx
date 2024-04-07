import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase.js';
import { setDoc, doc } from 'firebase/firestore';
import UserInformation from '../../model/UserInformation.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const token = user.accessToken;
        AsyncStorage.setItem('token', token);
        console.log(token);
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
        await setDoc(doc(db, 'users', user.uid), {
            email: userInfo.email,
            employeeID: userInfo.employeeID,
            name: userInfo.name,
            section: userInfo.section,
            title: userInfo.title,
            phone: userInfo.phoneNum,
            dateOfBirth: userInfo.DOB,
            team: userInfo.teamName
        });
        console.log(user.accessToken);
        const token = user.accessToken;
        AsyncStorage.setItem('token', token);
        return token;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export { Login, Register };
