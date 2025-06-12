import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useZayma } from './ZaymaContext';
import { useRouter } from 'expo-router';

export default function AuthScreen() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, login } = useZayma();
  const router = useRouter();

  const handleAuth = () => {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please enter both email and password');
      return;
    }

    if (mode === 'signup') {
      signup(email, password);
      Alert.alert('Success', 'Account created!');
      setMode('login');
    } else {
      const success = login(email, password);
      if (success) {
        router.replace('/(tabs)/HomeScreen');
      } else {
        Alert.alert('Login Failed', 'Wrong email or password');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ZaymaPay 🔐</Text>

      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setMode('login')} style={[styles.tab, mode === 'login' && styles.activeTab]}>
          <Text style={[styles.tabText, mode === 'login' && styles.activeText]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMode('signup')} style={[styles.tab, mode === 'signup' && styles.activeTab]}>
          <Text style={[styles.tabText, mode === 'signup' && styles.activeText]}>Signup</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
        <Text style={styles.authText}>{mode === 'login' ? 'Log In' : 'Sign Up'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  logo: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 40, color: '#27ae60' },
  tabContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: { borderBottomColor: '#27ae60' },
  tabText: { fontSize: 18, color: '#7f8c8d' },
  activeText: { color: '#27ae60', fontWeight: 'bold' },
  input: {
    backgroundColor: '#f1f2f6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    color: '#2c3e50',
  },
  authButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  authText: { color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: '600' },
});
