import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image, Dimensions, } from 'react-native';
import { useZayma } from './ZaymaContext';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
import zaymaCardImage from'../../assets/images/assets/images/freepik__the-style-is-candid-image-photography-with-natural__82401.png'; 

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
      <View style={styles.header}>
      <Text style={styles.appName}>ZaymaPay</Text>
      </View>

      <View style={styles.cardGraphicContainer}>
        <Image
          source={zaymaCardImage}
          style={styles.cardImage}
          resizeMode="contain"
          />
      </View>

      <Text style={styles.headline}>Experience Seamless Transactions with ZaymaPay</Text>
      <Text style={styles.subtext}>Your money, smarter. Faster. More secure</Text>
      
      <TextInput
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#BBBBBB"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

<TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Sign in</Text>
      </TouchableOpacity>

<TouchableOpacity style={styles.signupButton} onPress={() => router.push('/Signup')}>
    <Text style={styles.signupButtonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-end', paddingHorizontal: 25, backgroundColor: '#111111',paddingBottom: 40, },
  header: { position: 'absolute', top: 60, left: 25, },
  appName: { fontSize: 22, color: '#F5F5F5', fontWeight: '700' },
  cardGraphicContainer: {
    alignItems: 'center',
    marginBottom: 40,
    flex: 1,
    justifyContent: 'center',
  },
  cardImage: {
    width: width * 0.95,
    height: width * 0.95 * 0.7,
    opacity: 0.85,
    transform: [{ rotate: '-10deg' }],
  },
  headline: {
    fontSize: 34, 
    color: '#F5F5F5', 
    fontWeight: '300', 
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 40, 
  },
  subtext: {
    fontSize: 16,
    color: '#BBBBBB', 
    textAlign: 'center',
    marginBottom: 40, 
  },
  input: {
    height: 55, 
    backgroundColor: 'rgba(255,255,255,0.1)', 
    borderRadius: 12, 
    paddingHorizontal: 18,
    marginBottom: 20,
    color: '#FFFFFF', 
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#3498DB', 
    height: 58, 
    borderRadius: 12, 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15, 
  },
  loginButtonText: {
    color: '#FFFFFF', 
    fontSize: 18,
    fontWeight: 'bold', 
  },
  signupButton: {
    backgroundColor: 'transparent', 
    height: 58,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#F5F5F5', 
    borderWidth: 1.5, 
  },
  signupButtonText: {
    color: '#F5F5F5', 
    fontSize: 18,
    fontWeight: '600', 
  },
});