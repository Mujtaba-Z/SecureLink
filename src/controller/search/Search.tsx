import {db} from '../firebase.js';
import {getDocs, collection} from 'firebase/firestore';

export const Search = async (searchQuery: string) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const results = [];
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (
          userData.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          userData.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
          userData.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          userData.title.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          results.push({
            name: userData.name,
            section: userData.section,
            email: userData.email,
            title: userData.title,
          });
        }
      });
      return results;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  