import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useZayma } from './ZaymaContext';

export default function HomeScreen() {
  const router = useRouter();
  const { balance, transactions } = useZayma();

  const handleSendMoney = () => router.push('/(tabs)/SendMoney');
  const handleWithdraw = () => router.push('/(tabs)/Withdraw');

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to ZaymaPay 💸</Text>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Your Balance</Text>
        <Text style={styles.balanceAmount}>Ksh {balance.toFixed(2)}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleSendMoney}>
          <Text style={styles.actionText}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleWithdraw}>
          <Text style={styles.actionText}>Withdraw</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Recent Transactions</Text>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text style={styles.transactionTitle}>{item.title}</Text>
            <Text style={[styles.transactionAmount, { color: item.amount < 0 ? '#e74c3c' : '#2ecc71' }]}>
              {item.amount < 0 ? '-' : '+'} Ksh {Math.abs(item.amount)}
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noData}>No transactions yet</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    padding: 20,
  },
  welcome: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '500',
  },
  balanceCard: {
    backgroundColor: '#27ae60',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  balanceLabel: {
    color: '#ecf0f1',
    fontSize: 16,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#2980b9',
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  actionText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '500',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  transactionTitle: {
    fontSize: 16,
    color: '#2c3e50',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noData: {
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 20,
  },
});
