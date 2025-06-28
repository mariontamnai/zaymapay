import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground, Dimensions } from 'react-native';
import { useZayma } from './ZaymaContext';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useZayma();
  const router = useRouter();

  const handleSignup = () => {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please enter email and password');
      return;
    }

    signup(email, password);
    Alert.alert('Success', 'Account created successfully!');
    router.replace('/'); // Go back to login screen
  };

  return (
    <ImageBackground
      source={require('../../assets/images/young-woman-doing-shopping-online.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
      </View>
      <View style={styles.container}>
      <Text style={styles.title}>Create Account 🔐</Text>

      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, marginBottom: 20, fontWeight: 'bold', textAlign: 'center', color: '#27ae60' },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
  },
});
