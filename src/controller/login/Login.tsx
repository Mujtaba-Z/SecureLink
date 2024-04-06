import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase.js';
import { setDoc, doc } from 'firebase/firestore';
import UserInformation from '../../model/UserInformation.js';

export const Login = async (email: string, password: string) => {
    try {
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            return user;
        })
    } catch (error) {
        console.log(error);
    }
}

export const Register = async (userInfo: UserInformation) => {
    try {
        createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password).then((userCredential) => {
            const user = userCredential.user;
            userInfo.employeeID = user.uid;
            setDoc(doc(db, 'users', user.uid), {
                email: userInfo.email,
                employeeID: userInfo.employeeID,
                name: userInfo.name,
                section: userInfo.section,
                title: userInfo.title,
                phone: userInfo.phoneNum,
                dateOfBirth: userInfo.DOB,
                team: userInfo.teamName
            });
            console.log(user);
            return user;
        })
    } catch (error) {
        console.log(error);
    }
}