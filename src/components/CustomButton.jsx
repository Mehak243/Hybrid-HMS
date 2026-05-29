import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function CustomButton({ title, onPress, color = '#0EA5E9', style, textStyle }) {
  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      onPress={onPress} 
      style={[styles.button, { backgroundColor: color }, style]}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16, 
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    marginVertical: 8,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  }
});