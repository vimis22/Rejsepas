import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  style?: ViewStyle;
  loading?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ title, onPress, variant = 'primary', style, loading, disabled }) => {
  const getBackgroundColor = () => {
    if (disabled || loading) return '#A0A0A0';
    switch (variant) {
      case 'secondary': return '#E0E0E0';
      case 'danger': return '#FF3B30';
      default: return '#0047AB';
    }
  };

  const getTextColor = () => {
    return variant === 'secondary' ? '#333' : '#FFF';
  };

  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: getBackgroundColor() }, style]} 
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || loading}
    >
      <Text style={[styles.text, { color: getTextColor() }]}>
        {loading ? 'Loading...' : title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
