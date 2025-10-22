/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View, Text, TouchableOpacity } from 'react-native';
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
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [firstValue, setFirstValue] = useState('');

  const handleNumberInput = (num : any) => {
    if (displayValue === '0') {
      setDisplayValue(num.toString());
    } else {
      setDisplayValue(displayValue + num);
    }
  };

  const handleOperatorInput = (operator : any) => {
    setOperator(operator);
    setFirstValue(displayValue);
    setDisplayValue('0');
  }

  const handleEqual = () => {
    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(displayValue);

    if (operator === '+') {
      setDisplayValue((num1 + num2).toString());
    } else if (operator === '-') {
      setDisplayValue((num1 - num2).toString());
    } else if (operator === '*') {
      setDisplayValue((num1 * num2).toString());
    } else if (operator === '/') {
      setDisplayValue((num1 / num2).toString());
    }

    setOperator(null);
    setFirstValue('');
  }

  const handleClear = () => {
    setDisplayValue('0');
    setOperator(null);
    setFirstValue('');
  }
  return (
    <View style={styles.container}>
      <Text>Le Thanh Long</Text>
      <Text style={styles.display}>{displayValue}</Text>

      <View style={styles.row}>
        {['7', '8', '9', '/'].map((item) => (
          <TouchableOpacity
            key={item}
            style={styles.button}
            onPress={() =>
              ['/', '*', '-', '+'].includes(item)
                ? handleOperatorInput(item)
                : handleNumberInput(item)
            }
          >
            <Text style={styles.btnText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.row}>
        {['4', '5', '6', '*'].map((item) => (
          <TouchableOpacity
            key={item}
            style={styles.button}
            onPress={() =>
              ['/', '*', '-', '+'].includes(item)
                ? handleOperatorInput(item)
                : handleNumberInput(item)
            }
          >
            <Text style={styles.btnText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.row}>
        {['1', '2', '3', '-'].map((item) => (
          <TouchableOpacity
            key={item}
            style={styles.button}
            onPress={() =>
              ['/', '*', '-', '+'].includes(item)
                ? handleOperatorInput(item)
                : handleNumberInput(item)
            }
          >
            <Text style={styles.btnText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.row}>
        {['0', '.', '=', '+'].map((item) => (
          <TouchableOpacity
            key={item}
            style={styles.button}
            onPress={() => {
              if (item === '=') handleEqual();
              else if (['/', '*', '-', '+'].includes(item))
                handleOperatorInput(item);
              else handleNumberInput(item);
            }}
          >
            <Text style={styles.btnText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
        <Text style={styles.clearText}>C</Text>
      </TouchableOpacity>
    </View>
  );
}

export default App;
