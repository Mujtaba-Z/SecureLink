import { db } from '../firebase.js';
import { getDocs, collection, query, where, updateDoc, doc } from 'firebase/firestore';

export const giveAwardsToUsers = async () => {
    try {
        // Define award thresholds
        const awardThresholds = [
            { points: 100, award: 'BronzeMedal' },
            { points: 500, award: 'SilverMedal' },
            { points: 1000, award: 'GoldMedal' },
            { points: 5000, award: 'MVPMedal' } // Example threshold for MVP award
        ];

        const querySnapshot = await getDocs(
          collection(db, 'users')
        );

        // Iterate over user data
        querySnapshot.forEach(doc => {
            const userData = doc.data();
            const userAwards = [];

            // Check user's points against award thresholds
            awardThresholds.forEach(threshold => {
                if (userData.leaderboardPoints >= threshold.points) {
                    userAwards.push(threshold.award);
                }
            });

            // Award users
            if (userAwards.length > 0) {
                // Update user's data with awarded status and awards received
                updateDoc(doc.ref, {
                    awarded: true,
                    awards: userAwards
                });
            }
        });

        console.log('Awards given successfully.');
    } catch (error) {
        console.error('Error giving awards:', error);
    }
};