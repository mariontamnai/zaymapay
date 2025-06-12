import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useZayma } from './ZaymaContext';


export default function SendMoney() {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const { sendMoney } = useZayma();

  const router = useRouter();

  const handleSend = () => {
    const amountNum = parseFloat(amount);

    sendMoney(amountNum, phone);
    if (!phone || !amount || isNaN(amountNum) || amountNum <= 0) {
      Alert.alert('Error', 'Enter a valid phone number and amount.');
      return;
    }

    Alert.alert('Success', `Sent Ksh ${amountNum} to ${phone}`);
    router.back(); // Go back to Home after sending
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send Money 💸</Text>

      <TextInput
        placeholder="Phone number (e.g. 0712345678)"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
      />

      <TextInput
        placeholder="Amount (e.g. 500)"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
      />

      <Button title="Send" onPress={handleSend} color="#27ae60" />

      <View style={{ marginTop: 20 }}>
        <Button title="Cancel" onPress={() => router.back()} color="#7f8c8d" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});
