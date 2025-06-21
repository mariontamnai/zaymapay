import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useZayma } from './ZaymaContext';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [password, setPassword] = useState('');
  const { login } = useZayma();
  const router = useRouter();

  const handleLogin = () => {
    if (!password) {
      Alert.alert('Missing fields', 'Please enter email and password');
      return;
    }

    const success = login(password);
    if (success) {
      router.replace('/(tabs)/HomeScreen');
    } else {
      Alert.alert('Login Failed', 'Wrong password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ZaymaPay 🔐</Text>

      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={handleLogin} />

      <TouchableOpacity onPress={() => router.push('/Signup')} style={styles.signupLink}>
        <Text style={styles.signupText}>Don’t have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, marginBottom: 20, fontWeight: 'bold', textAlign: 'center', color: '#2c3e50' },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  signupLink: { marginTop: 20, alignSelf: 'center' },
  signupText: { color: '#3498db', fontSize: 16 },
});
