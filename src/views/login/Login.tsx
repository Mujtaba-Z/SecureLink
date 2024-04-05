import React, { useState } from "react";
import {Button, Text, Keyboard, View, StyleSheet, Image, Dimensions, TextInput} from "react-native";

const LoginPage = () => {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          leftIcon=""
          rightIcon=""
          placeholder="Email"
          /*onChangeText={}*/
        />
        <TextInput
          leftIcon=""
          rightIcon=""
          secureTextEntry={true}
          placeholder="Password"
          /*onChangeText={}*/
        />
        <View style={styles.loginButtonContainer}>
          <Button
            title="Login"
            /*onPress={}*/
            borderRadius={15}
            width={280}
            height={40}
          />
          <Button
            title="Register"
            /*onPress={}*/
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
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'cover',
    opacity: 0.7,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height + 50,
  },
  header: {
    position: 'absolute',
    top: 270,
    alignItems: 'center',
    zIndex: 1,
  },
  headerText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    textShadowColor: 'white',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
  },
  inputContainer: {
    position: 'absolute',
    top: 320,
    width: '80%',
    alignItems: 'center',
    zIndex: 1,
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