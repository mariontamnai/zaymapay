import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
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
            <Ionicons name="arrow-back" size={24} color="#fff" />
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
        padding: 10,
        borderRadius: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderWidth: 1,
        borderColor: '#888',
      },
    });