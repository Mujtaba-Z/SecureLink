import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase.js';
import { setDoc, doc } from 'firebase/firestore';

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

export const Register = async (email: string, password: string) => {
    try {
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                uid: user.uid
            });
            console.log(user);
            return user;
        })
    } catch (error) {
        console.log(error);
    }
}