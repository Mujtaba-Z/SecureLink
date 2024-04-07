import { db } from '../firebase.js';
import { getDocs, collection, orderBy, limit } from 'firebase/firestore';

export const fetchLeaderboardData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));

    const leaderboardData = [];
    querySnapshot.forEach(doc => {
        const userData = = doc.data();
        if (userData.leaderboardPoints > 0){
            leaderboardData.push(userData.);
        }
    });
    return leaderboardData;

  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    throw error;
  }
};