import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useZayma } from './ZaymaContext';
import { Ionicons } from '@expo/vector-icons';

export default function BuyAirtime() {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const { buyAirtime } = useZayma(); // You’ll add this function in the context
  const router = useRouter();

  const handleBuy = () => {
    const amountNum = parseFloat(amount);

    if (!phone || !amount || isNaN(amountNum) || amountNum <= 0) {
      Alert.alert('Error', 'Please enter a valid phone number and amount.');
      return;
    }

    buyAirtime(amountNum, phone);
    Alert.alert('Success', `Bought Ksh ${amountNum} airtime for ${phone}`);
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
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          placeholder="e.g. 0712345678"
          placeholderTextColor="#aaa"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
        />

        <Text style={styles.label}>Amount</Text>
        <TextInput
          placeholder="e.g. 100"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          style={styles.input}
        />

        <TouchableOpacity style={styles.buyBtn} onPress={handleBuy}>
          <Text style={styles.buyText}>Buy Airtime</Text>
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
  buyBtn: {
    backgroundColor: '#43b02a',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buyText: {
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
