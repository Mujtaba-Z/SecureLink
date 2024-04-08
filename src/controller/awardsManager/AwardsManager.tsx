import { db } from '../firebase.js';
import { getDocs, collection, setDoc, doc, updateDoc } from 'firebase/firestore';
import AwardsInformation from '../../model/AwardsInformation.js';
import { set } from 'firebase/database';

const setAwardsDoc = async (awardsInfo: AwardsInformation) => {
    try {
        // Check if points is undefined, if so, set it to a default value
        const points = awardsInfo.points !== undefined ? awardsInfo.points : 0;

        await setDoc(doc(db, 'awards', awardsInfo.employeeID), {
            employeeID: awardsInfo.employeeID,
            name: awardsInfo.name,
            awardsInfo: awardsInfo.awardsInfo,
            awarded: awardsInfo.awarded,
            points: points // Use the points variable which now contains a defined value
        });
    } catch (error) {
        console.log('Awards', awardsInfo);
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
                const awardsInfo = new AwardsInformation(userData.points, userAwards, userData.employeeID, true, userData.name);
               setAwardsDoc(awardsInfo);
            } else if (userAwards.length === 0) {
                // Update user's data with awarded status and awards received
                const awardsInfo = new AwardsInformation(userData.points, userAwards, userData.employeeID, false, userData.name);
                setAwardsDoc(awardsInfo);
            }
        });

        console.log('Awards given successfully.');
    } catch (error) {
        console.error('Error giving awards:', error);
    }
};
