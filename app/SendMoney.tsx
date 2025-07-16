import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert,  StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useZayma } from './ZaymaContext';
import BackButton from './BackButton';


export default function SendMoney() {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const { sendMoney } = useZayma();

  const router = useRouter();

  const handleSend = () => {
    const amountNum = parseFloat(amount);

    
    if (!phone || !amount || isNaN(amountNum) || amountNum <= 0) {
      Alert.alert('Error', 'Enter a valid phone number and amount.');
      return;
    }
    
    sendMoney(amountNum, phone);
    Alert.alert('Success', `Sent Ksh ${amountNum} to ${phone}`);
    router.back(); 
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Send </Text>

      <TextInput
        placeholder="Phone number (e.g. 0712345678)"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        placeholderTextColor="aaa"
      />

      <TextInput
        placeholder="Amount (e.g. 500)"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
        placeholderTextColor="#aaa"
      />

<TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: '#000',
    //justifyContent: 'center',
  },
  card: {
    backgroundColor: '#1c1c1e',
    padding: 20,
    borderRadius: 15,
    marginTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 40,
    textAlign: 'center',
    color: '#bbb',
  },
  input: {
    backgroundColor: '#2c2c2e',
    color: '#fff',
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    borderColor: '#444',
    borderWidth: 1,
    fontSize: 16,
  },
sendButton: {
  backgroundColor: '#43b02a',
  padding: 15,
  borderRadius: 10,
  alignItems: 'center',
 },
sendButtonText: {
  color: '#fff',
  fontWeight: '500',
  fontSize: 15,
},
cancelButton: {
  marginTop: 15,
  backgroundColor: '#bbb',
  padding: 15,
  borderRadius: 10,
  alignItems: 'center',
},
cancelButtonText: {
  color: '#fff',
  fontWeight: '500',
  fontSize: 15,
},
});
