import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import { fetchLeaderboardData } from '../../controller/leaderboardManager/LeaderboardManager.tsx';
import { giveAwardsToUsers } from '../../controller/awardsManager/AwardsManager.tsx';
import bronzeMedal from '../../assets/BronzeMedal.png';
import silverMedal from '../../assets/SilverMedal.png';
import goldMedal from '../../assets/GoldMedal.png';
import mvpMedal from '../../assets/MVPMedal.png';

const ViewLeaderboard = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const data = await fetchLeaderboardData(); // Fetch user data using the controller function
                // Sort the data based on leaderboard points in descending order
                const sortedData = data.sort((a, b) => b.leaderboardPoints - a.leaderboardPoints);
                // Limit the result to 10 users
                const topTenUsers = sortedData.slice(0, 10);
                setLeaderboardData(topTenUsers);
                await giveAwardsToUsers();
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
            }
        };

        fetchLeaderboard();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Top 10 Users</Text>
            {leaderboardData.map((user, index) => (
                <View key={index} style={styles.userContainer}>
                    <Text style={styles.userName}>{`${index + 1}. ${user.name}`}</Text>
                    <Text style={styles.userPoints}>{`${user.leaderboardPoints} Points`}</Text>
                    <Text style={styles.userPoints}>{`${user.awards} `}</Text>
                    {user.awards.includes('Bronze Medal') && <Image source={bronzeMedal} style={styles.medalImage} />}
                    {user.awards.includes('Silver Medal') && <Image source={silverMedal} style={styles.medalImage} />}
                    {user.awards.includes('Gold Medal') && <Image source={goldMedal} style={styles.medalImage} />}
                    {user.awards.includes('MVP Award') && <Image source={mvpMedal} style={styles.medalImage} />}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    userName: {
        marginRight: 10,
        fontSize: 18,
    },
    userPoints: {
        fontSize: 18,
    },
    medalImage: {
        width: 30, // Adjust the width and height according to your design
        height: 30,
        marginLeft: 5, // Add some spacing between medal images and user information
    },
});

export default ViewLeaderboard;