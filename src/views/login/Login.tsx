import React, { useState } from "react";
import { Button, Text, View, StyleSheet, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Login, Register } from "../../controller/login/Login.tsx";

const LoginPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const user = await Login(email, password);
      console.log(user);
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async () => {
    try {
      const user = await Register(email, password);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
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
