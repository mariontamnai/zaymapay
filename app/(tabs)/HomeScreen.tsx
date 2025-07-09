import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useZayma } from './ZaymaContext';
import { LinearGradient } from 'expo-linear-gradient';

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
      <Text style={styles.welcome}>Hey bestiee 👋</Text>

      <LinearGradient colors={['#27ae60', '#2ecc71']} style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balanceAmount}>Ksh {balance.toFixed(2)}</Text>
      </LinearGradient>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleSendMoney}>
          <Text style={styles.actionText}>💸 Send</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleWithdraw}>
          <Text style={styles.actionText}>🏧 Withdraw</Text>
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
            <Text style={styles.transactionTitle}>
              {item.title.includes('Sent')
                ? '📤 '
                : item.title.includes('Withdraw')
                ? '🏧 '
                : '💰 '}
              {item.title}
            </Text>
            <Text style={[
              styles.transactionAmount,
              { color: item.amount < 0 ? '#e74c3c' : '#2ecc71' }
            ]}>
              {item.amount < 0 ? '-' : '+'} Ksh {Math.abs(item.amount)}
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noData}>No transactions yet 🫠</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  welcome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  balanceCard: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#2ecc71',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  balanceLabel: {
    color: '#ecf0f1',
    fontSize: 16,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 5,
  },
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
    borderRadius: 15,
  },
  actionText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
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
  filterText: {
    color: '#2c3e50',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#444',
  },
  transactionTitle: {
    fontSize: 16,
    color: '#ecf0f1',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noData: {
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
  },
});
