import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [balance, setBalance] = useState(5000); // Starting balance
  const [transactions, setTransactions] = useState([
    { id: '1', title: 'Received from Mom', amount: 2000 },
    { id: '2', title: 'Sent to John', amount: -1000 },
  ]);

  const router = useRouter();

  const handleSendMoney = () => {
    if (balance >= 500) {
      setBalance(balance - 500);
      setTransactions([
        { id: Date.now().toString(), title: 'Sent to friend', amount: -500 },
        ...transactions,
      ]);
      Alert.alert('Success', 'You sent Ksh 500');
    } else {
      Alert.alert('Error', 'Insufficient funds');
    }
  };

  const handleWithdraw = () => {
    if (balance >= 300) {
      setBalance(balance - 300);
      setTransactions([
        { id: Date.now().toString(), title: 'Withdraw to Bank', amount: -300 },
        ...transactions,
      ]);
      Alert.alert('Success', 'You withdrew Ksh 300');
    } else {
      Alert.alert('Error', 'Insufficient balance');
    }
  };

  const handleLogout = () => {
    router.replace('/'); // Go back to login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ZaymaPay 💸</Text>
      <Text style={styles.balance}>Balance: Ksh {balance}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Send Money" onPress={handleSendMoney} color="#27ae60" />
        <Button title="Withdraw" onPress={handleWithdraw} color="#e67e22" />
      </View>

      <Text style={styles.historyTitle}>Transaction History</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.transaction}>
            {item.title}: {item.amount > 0 ? '+' : ''}Ksh {item.amount}
          </Text>
        )}
      />

      <View style={{ marginTop: 30 }}>
        <Button title="Logout" onPress={handleLogout} color="#c0392b" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  balance: {
    fontSize: 20,
    marginBottom: 20,
    color: '#2c3e50',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
    marginBottom: 20,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  transaction: {
    fontSize: 16,
    marginBottom: 5,
    color: '#34495e',
  },
});
