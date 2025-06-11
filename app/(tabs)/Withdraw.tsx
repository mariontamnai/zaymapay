import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Withdraw() {
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState('');
  const router = useRouter();

  const handleWithdraw = () => {
    const amountNum = parseFloat(amount);
    if (!account || !amount || isNaN(amountNum) || amountNum <= 0) {
      Alert.alert('Error', 'Please enter a valid account number and amount.');
      return;
    }

    Alert.alert('Success', `Withdrew Ksh ${amountNum} to ${account}`);
    router.back(); // Go back to home
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Withdraw Money 🏦</Text>

      <TextInput
        placeholder="Bank/Agent Account No."
        value={account}
        onChangeText={setAccount}
        style={styles.input}
      />

      <TextInput
        placeholder="Amount (e.g. 300)"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
      />

      <Button title="Withdraw" onPress={handleWithdraw} color="#e67e22" />

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
