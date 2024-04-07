import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginPage from './src/views/login';
import MainPage from './src/views/mainPage'
import ChatPage from './src/views/chatPage'
import Search from './src/views/searchPage';
import Profile from './src/views/profile';
import SignupPage from './src/views/signup/Signup.tsx';
import Leaderboard from './src/views/leaderboard/'

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
  statusBarTranslucent: true,
};

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={screenOptions}
        />
        <Stack.Screen
          name="Signup"
          component={SignupPage}
          options={screenOptions}
        />
        <Stack.Screen
          name="Home"
          component={MainPage}
          options={screenOptions}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="ChatPage"
          component={ChatPage}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Leaderboard"
          component={Leaderboard}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
