import {db} from '../firebase.js';
import {getDocs, collection} from 'firebase/firestore';

// Function to search for users based on a search query
export const Search = async (searchQuery: string) => {
    try {

      // Get all users from the database
      const querySnapshot = await getDocs(collection(db, 'users'));
      const results = [];

      // Iterate through each user and check if their data matches the search query
      querySnapshot.forEach((doc) => {
        const userData = doc.data();

        // If the user's data matches the search query, add it to the results array
        if (
          userData.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          userData.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
          userData.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          userData.title.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
        const employeeID = userData.employeeID;
          results.push({
            name: userData.name,
            section: userData.section,
            email: userData.email,
            title: userData.title,
            employeeId: employeeID
          });
        }
      });
      return results;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  