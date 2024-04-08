import { db } from '../firebase.js';
import { getDocs, collection, orderBy, limit } from 'firebase/firestore';

export const fetchLeaderboardData = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(db, 'awards'),
    );

    const leaderboardData = [];
    querySnapshot.forEach(doc => {
      leaderboardData.push(doc.data());
    });
    
    return leaderboardData;
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    throw error;
  }
};