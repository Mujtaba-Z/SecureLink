import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme } from 'react-native';
import MainPage from './mainPage'; // Make sure the import path matches the file name exactly

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={[styles.container, isDarkMode ? styles.darkMode : styles.lightMode]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <MainPage />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkMode: {
    backgroundColor: '#333', // Assuming a darker background for dark mode
  },
  lightMode: {
    backgroundColor: '#FFF', // Assuming a lighter background for light mode
  },
});

export default App;
