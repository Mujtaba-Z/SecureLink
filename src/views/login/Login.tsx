import React, { useState } from "react";
import { Button, Text, View, StyleSheet, TextInput, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Login } from "../../controller/authentication/Authentication.tsx";

const LoginPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const user = await Login(email, password);
      if (user){
      navigation.navigate('Home');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async () => {
      try {
        navigation.navigate('Signup');
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/securelink-high-resolution-logo-black-transparent.png')} style={styles.loginImage}/>
      <Text style={styles.loginTitle}>Welcome Back!!!!</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          style={styles.textInput}
        />
        <View style={styles.loginButtonContainer}>
          <Button
            title="Login"
            onPress={handleLogin}
            borderRadius={15}
            width={280}
            height={40}
          />
        </View>
        <View style={styles.registerButtonContainer}>
          <Button
            title="Register"
            onPress={handleRegister}
            borderRadius={15}
            width={280}
            height={40}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginImage: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  loginTitle: {
    fontSize: 30,
    marginBottom: 50,
  },
  inputContainer: {
    width: '80%',
    alignItems: 'center',
  },
  textInput: {
    width: 280,
    height: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 15,
    marginBottom: 10,
  },
  loginButtonContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    width: 280,
    marginTop: 10,
  },
  registerButtonContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    width: 280,
    marginTop: 10,
  },
});

export default LoginPage;