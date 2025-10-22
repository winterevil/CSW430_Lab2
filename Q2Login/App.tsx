/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import React from 'react';
import LoginScreen from './Login/Login';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    // <View style={styles.container}>
    //   <NewAppScreen
    //     templateFileName="App.tsx"
    //     safeAreaInsets={safeAreaInsets}
    //   />
    // </View>
    <LoginScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
