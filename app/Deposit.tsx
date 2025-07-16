import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useZayma } from './ZaymaContext';
import { Ionicons } from '@expo/vector-icons';

export default function Deposit() {
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState('');
  const { depositMoney } = useZayma();
  const router = useRouter();

  const handleDeposit = () => {
    const amountNum = parseFloat(amount);

    if (!account || !amount || isNaN(amountNum) || amountNum <= 0) {
      Alert.alert('Error', 'Please enter a valid account number and amount.');
      return;
    }

    depositMoney(amountNum);
    Alert.alert('Success', `Deposited Ksh ${amountNum} to ${account}`);
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Bank Account No.</Text>
        <TextInput
          placeholder="Enter account number"
          placeholderTextColor="#aaa"
          value={account}
          onChangeText={setAccount}
          style={styles.input}
        />

        <Text style={styles.label}>Amount</Text>
        <TextInput
          placeholder="e.g. 1000"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          style={styles.input}
        />

        <TouchableOpacity style={styles.depositBtn} onPress={handleDeposit}>
          <Text style={styles.depositText}>Deposit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 15,
  },
  card: {
    backgroundColor: '#1c1c1e',
    padding: 20,
    borderRadius: 15,
    marginTop: 30,
  },
  label: {
    color: '#bbb',
    marginBottom: 5,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#2c2c2e',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#444',
  },
  depositBtn: {
    backgroundColor: '#43b02a',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  depositText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelBtn: {
    marginTop: 15,
    alignItems: 'center',
  },
  cancelText: {
    color: '#aaa',
    fontSize: 14,
  },
});
