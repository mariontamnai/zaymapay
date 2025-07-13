import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function BackButton() {
  const router = useRouter();

  return (
    <View style={styles.container}>
        <TouchableOpacity
        onPress={() => router.back()}
        style={styles.button}
        activeOpacity={0.7}
        >
            <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
    </View>
    
  );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
      },
      button: {
        position: 'absolute',
        top: 1,
        left: 0,
        zIndex: 100,
        padding: 8,
        
      },
    });