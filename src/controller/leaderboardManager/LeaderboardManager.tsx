import { db } from '../firebase.js';
import { getDocs, collection, orderBy, limit } from 'firebase/firestore';

// Function to fetch leaderboard data from the database
export const fetchLeaderboardData = async () => {
  try {
    
    // Get all awards from the database
    const querySnapshot = await getDocs(
      collection(db, 'awards'),
    );

    // Create an array to store the leaderboard data
    const leaderboardData = [];

    // Iterate through each award and add it to the leaderboard data array
    querySnapshot.forEach(doc => {
      leaderboardData.push(doc.data());
    });
    
    return leaderboardData;
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    throw error;
  }
};