import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useZayma } from './ZaymaContext';

const FILTERS = ['All', 'Sent', 'Withdraw'];

export default function HomeScreen() {
  const router = useRouter();
  const { balance, transactions } = useZayma();
  const [selectedFilter, setSelectedFilter] = useState('All');

  const handleSendMoney = () => router.push('/(tabs)/SendMoney');
  const handleWithdraw = () => router.push('/(tabs)/Withdraw');

  const filteredTransactions = transactions.filter((tx) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Sent') return tx.title.toLowerCase().includes('sent');
    if (selectedFilter === 'Withdraw') return tx.title.toLowerCase().includes('withdraw');
  });

  return (
    <View style={styles.container}>

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

      <View style={styles.filterRow}>
        {FILTERS.map((filter) => (
          <TouchableOpacity
            key={filter}
            onPress={() => setSelectedFilter(filter)}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.filterActive,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.filterTextActive,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredTransactions}
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
  container: { flex: 1, backgroundColor: 'black', padding: 20 },
  welcome: { fontSize: 20, marginBottom: 10, fontWeight: '500' },
  balanceCard: {
    backgroundColor: '#27ae60',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  balanceLabel: { color: '#ecf0f1', fontSize: 16 },
  balanceAmount: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginTop: 5 },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#2980b9',
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  actionText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#dcdde1',
  },
  filterActive: {
    backgroundColor: '#27ae60',
  },
  filterText: { color: '#2c3e50' },
  filterTextActive: { color: '#fff', fontWeight: 'bold' },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  transactionTitle: { fontSize: 16, color: '#2c3e50' },
  transactionAmount: { fontSize: 16, fontWeight: 'bold' },
  noData: {
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 20,
  },
});
