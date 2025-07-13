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
        top: 50,
        left: 20,
        zIndex: 100,
        padding: 8,
        borderRadius: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: '#ffffff30',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
      },
    });