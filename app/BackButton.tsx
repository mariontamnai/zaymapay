import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function BackButton() {
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
      <Text style={styles.backText}>← Back</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    marginTop: 40,
    marginLeft: 20,
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    color: '#3498db',
    fontWeight: '600',
  },
});
