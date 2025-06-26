import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  Alert,
  ImageBackground, // Add this import
  Dimensions // Add this to help with sizing
} from 'react-native';
import { useZayma } from './ZaymaContext';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

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
    router.replace('/'); 
  };

  return (
    <ImageBackground
      source={require('../../assets/images/young-woman-doing-shopping-online.jpg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Create Account 🔐</Text>

          <TextInput
            placeholder="Email"
            placeholderTextColor="#aaa" 
            keyboardType="email-address"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#aaa" 
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          <View style={styles.buttonContainer}>
            <Button 
              title="Sign Up" 
              onPress={handleSignup} 
              color="#27ae60"
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent dark overlay
    justifyContent: 'center',
  },
  container: { 
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // Slightly transparent white
    borderRadius: 15,
    padding: 25,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: { 
    fontSize: 28, 
    marginBottom: 20, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: '#27ae60' 
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
  },
  buttonContainer: {
    borderRadius: 8,
    overflow: 'hidden', // This makes the button respect border radius
    marginTop: 10,
  },
});