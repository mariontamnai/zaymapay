import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, GestureResponderEvent } from 'react-native';
import { useZayma } from './ZaymaContext';
import BackButton from './BackButton';

type ActionIconProps = {
  label: string;
  icon: string;
  onPress: (event: GestureResponderEvent) => void;
}

const FILTERS = ['All', 'Sent', 'Withdraw'];

export default function HomeScreen() {
  const router = useRouter();
  const { balance, transactions } = useZayma();
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredTransactions = transactions.filter((tx) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Sent') return tx.title.toLowerCase().includes('sent');
    if (selectedFilter === 'Withdraw') return tx.title.toLowerCase().includes('withdraw');
  });

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.welcome}>Welcome Back 👋</Text>

      <LinearGradient colors={['#27ae60', '#2ecc71']} style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balanceAmount}>Ksh {balance.toFixed(2)}</Text>
      </LinearGradient>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <ActionIcon label="Send" icon="send-outline" onPress={() => router.push('../../SendMoney')} />
        <ActionIcon label="Withdraw" icon="cash-outline" onPress={() => router.push('../../Withdraw')} />
        <ActionIcon label="Deposit" icon="wallet-outline" onPress={() => router.push('../../Deposit')} />
        <ActionIcon label="Airtime" icon="phone-portrait-outline" onPress={() => router.push('../../BuyAirtime')} />
      </View>

      {/* Filters */}
      <View style={styles.filterRow}>
        {FILTERS.map((filter) => (
          <TouchableOpacity
            key={filter}
            onPress={() => setSelectedFilter(filter)}
            style={[styles.filterButton, selectedFilter === filter && styles.filterActive]}>
            <Text style={[styles.filterText, selectedFilter === filter && styles.filterTextActive]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Transactions */}
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons
                name={
                  item.title.includes('Sent')
                    ? 'arrow-up-circle-outline'
                    : item.title.includes('Withdraw')
                    ? 'cash-outline'
                    : 'add-circle-outline'
                }
                size={22}
                color={item.amount < 0 ? '#e74c3c' : '#2ecc71'}
                style={{ marginRight: 8 }}
              />
              <Text style={styles.transactionTitle}>{item.title}</Text>
            </View>
            <Text
              style={[
                styles.transactionAmount,
                { color: item.amount < 0 ? '#e74c3c' : '#2ecc71' },
              ]}
            >
              {item.amount < 0 ? '-' : '+'} Ksh {Math.abs(item.amount)}
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noData}>No transactions yet</Text>}
      />
    </View>
  );
}


const ActionIcon: React.FC<ActionIconProps> = ({ label, icon, onPress }) => (
  <TouchableOpacity style={styles.iconButton} onPress={onPress}>
    <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={28} color="#fff" />
    <Text style={styles.iconLabel}>{label}</Text>
  </TouchableOpacity>
);

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
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  iconButton: {
    width: '22%',
    backgroundColor: '#1c1c1e',
    borderRadius: 15,
    paddingVertical: 16,
    alignItems: 'center',
  },
  iconLabel: {
    color: '#fff',
    fontSize: 13,
    marginTop: 8,
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
    backgroundColor: '#2c2c2e',
  },
  filterActive: {
    backgroundColor: '#27ae60',
  },
  filterText: {
    color: '#fff',
    fontWeight: '500',
  },
  filterTextActive: {
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
    fontSize: 15,
    color: '#ecf0f1',
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  noData: {
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
  },
});
