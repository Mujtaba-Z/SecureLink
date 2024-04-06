import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {RNCSafeAreaProvider} from '@react-native-safe-area-context/native';
import LoginPage from './src/views/login';
import MainPage from './src/views/mainPage'
import ChatPage from './src/views/chatPage'

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
          name="Home"
          component={MainPage}
          options={screenOptions}
        />
        <Stack.Screen
          name="ChatPage"
          component={ChatPage}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;