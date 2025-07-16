import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert,  StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useZayma } from './ZaymaContext';
import { Ionicons} from '@expo/vector-icons';



export default function Withdraw() {
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState('');
  const { withdrawMoney } = useZayma();

  const router = useRouter();

  const handleWithdraw = () => {
    const amountNum = parseFloat(amount);

    
    if (!account || !amount || isNaN(amountNum) || amountNum <= 0) {
      Alert.alert('Error', 'Please enter a valid account number and amount.');
      return;
    }

    withdrawMoney(amountNum);
    Alert.alert('Success', `Withdrew Ksh ${amountNum} to ${account}`);
    router.back(); // Go back to home
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      

      
      <View style={styles.card}>
        <Text style={styles.label}>Bank / Agent Account No.</Text>
        <TextInput
          placeholder="Enter account number"
          placeholderTextColor="#aaa"
          value={account}
          onChangeText={setAccount}
          style={styles.input}
        />

        <Text style={styles.label}>Amount</Text>
        <TextInput
          placeholder="e.g. 300"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          style={styles.input}
        />

        <TouchableOpacity style={styles.withdrawBtn} onPress={handleWithdraw}>
          <Text style={styles.withdrawText}>Withdraw</Text>
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
  withdrawBtn: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  withdrawText: {
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