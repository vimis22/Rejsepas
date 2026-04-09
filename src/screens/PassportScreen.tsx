import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Navbar } from '../components/Navbar';
import { MOCK_PROFILE } from '../logic/mockData';

export const PassportScreen = () => {
  return (
    <View style={styles.container}>
      <Navbar title="Passport Details" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerArea}>
           <Text style={styles.countryFlag}>{MOCK_PROFILE.flag}</Text>
           <Text style={styles.countryName}>{MOCK_PROFILE.country}</Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.field}>
            <Text style={styles.label}>Passport Number</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.value}>{MOCK_PROFILE.passportNumber}</Text>
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>CPR Number</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.value}>{MOCK_PROFILE.cprNumber}</Text>
            </View>
          </View>
        </View>

        <View style={styles.helpTextContainer}>
          <Text style={styles.helpText}>
            Ensure your passport information is kept up to date for smooth travel processing.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    padding: 20,
  },
  headerArea: {
    backgroundColor: '#0047AB',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  countryFlag: {
    fontSize: 64,
    marginBottom: 8,
  },
  countryName: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '700',
  },
  infoCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: '#F5F5F5',
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  helpTextContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  helpText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
  },
});
