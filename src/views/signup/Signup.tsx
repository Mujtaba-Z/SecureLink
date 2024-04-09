import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Register } from "../../controller/authentication/Authentication.tsx";
import UserInformation from '../../model/UserInformation.js';
import { useNavigation } from '@react-navigation/native';

const SignupPage = () => {
    const navigation = useNavigation();

    // State variables to store user input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [employeeID, setEmployeeID] = useState('');
    const [section, setSection] = useState('');
    const [title, setTitle] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [teamName, setTeamName] = useState('');
    const [DOB, setDOB] = useState('');

    // Default leaderboard points
    const leaderboardPoints = 0;


    const handleSignup = async () => {
        // Implement signup logic here
        console.log('Signup with:');
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Name:', name);
        console.log('Employee ID:', employeeID);
        console.log('Leaderboard points:', leaderboardPoints)
        const userReg = new UserInformation(employeeID, name, email, password, section, title, phoneNum, teamName, DOB, leaderboardPoints);
        try {
          const user = await Register(userReg);
          console.log(user);
        } catch (error) {
          console.log(error);
        }
        try {
          navigation.navigate('Login');
        } catch (error) {
          console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={setName}
                value={name}
            />
            <TextInput
                style={styles.input}
                placeholder="Employee ID"
                onChangeText={setEmployeeID}
                value={employeeID}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Section"
                onChangeText={setSection}
                value={section}
            />
            <TextInput
                style={styles.input}
                placeholder="Title"
                onChangeText={setTitle}
                value={title}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone #"
                onChangeText={setPhoneNum}
                value={phoneNum}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Team Name"
                onChangeText={setTeamName}
                value={teamName}
            />
            <TextInput
                style={styles.input}
                placeholder="Date of Birth"
                onChangeText={setDOB}
                value={DOB}
                keyboardType="numeric"
            />
            <Button title="Sign Up" onPress={handleSignup} />
        </View>
    );
};

// Styles
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
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
    },
});

export default SignupPage;