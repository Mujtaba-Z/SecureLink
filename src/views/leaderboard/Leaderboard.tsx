import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fetchLeaderboardData } from '../../controller/leaderboardManager/LeaderboardManager.tsx';

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
});

export default ViewLeaderboard;