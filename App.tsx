import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {RNCSafeAreaProvider} from '@react-native-safe-area-context/native';
import LoginPage from './src/views/login';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;