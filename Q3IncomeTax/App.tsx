/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View, Text, TextInput, Button } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import React, {useState} from 'react';
import styles from './style';

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
  const [income, setIncome] = useState('');
  const [tax, setTax] = useState('');

  const calculateTax = () => {
    const incomeAmount = parseFloat(income);

    if (isNaN(incomeAmount) || incomeAmount < 0) {
      setTax('Invalid income');
      return;
    }

    let taxAmount = 0;
    if (incomeAmount <= 10000000) {
      taxAmount = incomeAmount * 0.1;
    } else if (incomeAmount <= 50000000) {
      taxAmount = 1000000 * 0.1 + (incomeAmount - 10000000) * 0.2;
    } else {
      taxAmount = 1000000 * 0.1 + 40000000 * 0.2 + (incomeAmount - 50000000) * 0.3;
    }

    setTax(`Income Tax: ${taxAmount.toFixed(2)}đ`);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Income Tax Calculator</Text>
      <Text>Le Thanh Long</Text>
      <TextInput
      textAlign='right'
      style={styles.input}
      placeholder='Enter your income'
      keyboardType='numeric'
      value={income}
      onChangeText={text => setIncome(text)} />
      <Button title='Calculate Tax' onPress={calculateTax} />
      <Text style={styles.result}>{tax}</Text>
    </View>
  );
}

export default App;
