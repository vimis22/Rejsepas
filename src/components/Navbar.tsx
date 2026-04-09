import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

interface NavbarProps {
  title: string;
  onBack?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ title, onBack }) => {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.content}>
          {onBack && (
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <ChevronLeft color="#FFF" size={24} />
            </TouchableOpacity>
          )}
          <Text style={styles.title}>{title}</Text>
          <View style={styles.spacer} />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0047AB',
    paddingBottom: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    height: 56,
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  spacer: {
    width: 24,
  }
});
