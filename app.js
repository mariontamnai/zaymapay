import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import Navigation from './app/Navigation';

// Removed duplicate export default statement
function AppNavigation() {
  return <Navigation />;
}
export default function App() {
  const [pin, setPin] = useState('');
  const AppNavigation = () => <Navigation />;

  const handleLogin = () => {
    if (pin === '1234') {
      Alert.alert('Success', 'Welcome to ZaymaPay!');
    } else {
      Alert.alert('Error', 'Invalid PIN. Try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ZaymaPay</Text>
      <TextInput
        placeholder="Enter your PIN"
        secureTextEntry
        keyboardType="number-pad"
        style={styles.input}
        value={pin}
        onChangeText={setPin}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 20
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff'
  },
});
