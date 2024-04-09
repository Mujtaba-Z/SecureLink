import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { fetchLeaderboardData } from '../../controller/leaderboardManager/LeaderboardManager.tsx';
import { giveAwardsToUsers } from '../../controller/awardsManager/AwardsManager.tsx';
import { useNavigation } from '@react-navigation/native';
import bronzeMedal from '../../assets/BronzeMedal.png';
import silverMedal from '../../assets/SilverMedal.png';
import goldMedal from '../../assets/GoldMedal.png';
import mvpMedal from '../../assets/MVPMedal.png';

const ViewLeaderboard = () => {
    const navigation = useNavigation();

    // State variable to store leaderboard data
    const [leaderboardData, setLeaderboardData] = useState([]);

    // useEffect to fetch leaderboard data
    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const data = await fetchLeaderboardData(); // Fetch user data using the controller function
                // Sort the data based on leaderboard points in descending order
                const sortedData = data.sort((a, b) => b.points - a.points);
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

    // function for navigating to different screens
    const handlePress = (destination: string) => {
        navigation.navigate(destination);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Top 10 Users</Text>
            {leaderboardData.map((user, index) => (
                <View key={index} style={styles.userContainer}>
                <Text style={styles.userName}>{`${index + 1}. ${user.name}`}</Text>
                <Text style={styles.userPoints}>{`${user.points} Points`}</Text>
                <View style={styles.medalsContainer}>
                    {user.awardsInfo.map((award, index) => {
                        let medalImage;
                        switch (award) {
                            case 'BronzeMedal':
                                medalImage = bronzeMedal;
                                break;
                            case 'SilverMedal':
                                medalImage = silverMedal;
                                break;
                            case 'GoldMedal':
                                medalImage = goldMedal;
                                break;
                            case 'MVPMedal':
                                medalImage = mvpMedal;
                                break;
                            default:
                                break;
                        }
                        return <Image key={index} source={medalImage} style={styles.medalImage} />;
                    })}
                </View>

            </View>
            
            ))}
                <View style={styles.navBar}>
                    <TouchableOpacity style={styles.navButton} onPress={() => handlePress('Home')}>
                        <Text style={styles.navBarText}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navButton} onPress={() => handlePress('Search')}>
                        <Text style={styles.navBarText}>Search</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navButton} onPress={() => handlePress('Profile')}>
                        <Text style={styles.navBarText}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navButton} onPress={() => handlePress('Leaderboard')}>
                        <Text style={styles.navBarText}>Leaderboard</Text>
                    </TouchableOpacity>
                </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Set background color
        paddingHorizontal: 20,
        paddingTop: 20, // Add padding to the top to avoid overlap with status bar
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center', // Center-align the title
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingVertical: 10, // Add vertical padding for better spacing
        backgroundColor: '#f5f5f5', // Add a light background color for each user container
        borderRadius: 8, // Add border radius for rounded corners
    },
    userName: {
        marginRight: 10,
        fontSize: 18,
        flex: 1, // Let user name take remaining space
    },
    userPoints: {
        fontSize: 18,
    },
    medalsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    medalImage: {
        width: 30,
        height: 30,
        marginLeft: 5,
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#f0f0f0',
        paddingVertical: 10, // Adjust vertical padding for better spacing
    },
    navButton: {
        paddingHorizontal: 20, // Add horizontal padding for better button appearance
    },
    navBarText: {
        fontSize: 18, // Decrease font size for navigation buttons
        color: '#333',
    },
});

export default ViewLeaderboard;