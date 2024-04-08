import { db } from '../firebase.js';
import { getDocs, collection, setDoc, doc, updateDoc } from 'firebase/firestore';
import AwardsInformation from '../../model/AwardsInformation.js';
import { set } from 'firebase/database';

const setAwardsDoc = async (awardsInfo: AwardsInformation) => {
    try {
        await setDoc(doc(db, 'awards', awardsInfo.employeeID), {
            employeeID: awardsInfo.employeeID,
            name: awardsInfo.name,
            awardsInfo: awardsInfo.awardsInfo,
            awarded: awardsInfo.awarded,
            points: awardsInfo.points
        });
    } catch (error) {
        console.error('Error setting awards doc:', error);
    }
}


export const giveAwardsToUsers = async () => {
    try {
        // Define award thresholds
        const awardThresholds = [
            { points: 100, award: 'BronzeMedal' },
            { points: 500, award: 'SilverMedal' },
            { points: 1000, award: 'GoldMedal' },
            { points: 5000, award: 'MVPMedal' } // Example threshold for MVP award
        ];

        const querySnapshot = await getDocs(collection(db, 'users'));

        // Iterate over user data
        querySnapshot.forEach(async doc2 => {
            const userData = doc2.data();
            let bestAward = null;

            // Check user's points against award thresholds
            awardThresholds.forEach(threshold => {
                if (userData.leaderboardPoints >= threshold.points) {
                    bestAward = threshold.award;
                }
            });

            const points = userData.points || 0;

            // Award users
            if (bestAward !== null) {
                // Update user's data with awarded status and awards received
                const awardsInfo = new AwardsInformation(points, [bestAward], userData.employeeID, true, userData.name);
               setAwardsDoc(awardsInfo);
            } else {
                // No award
                const awardsInfo = new AwardsInformation(points, [], userData.employeeID, false, userData.name);
                setAwardsDoc(awardsInfo);
            }
        });

        console.log('Awards given successfully.');
    } catch (error) {
        console.error('Error giving awards:', error);
    }
};
