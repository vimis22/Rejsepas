import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Navbar } from '../components/Navbar';
import { Mail, Phone } from 'lucide-react-native';

export const ContactInfoScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Navbar title="Contact Info" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.row}>
            <Mail size={24} color="#0047AB" />
            <View style={styles.textContainer}>
              <Text style={styles.label}>Email Address</Text>
              <Text style={styles.value}>support@passtrax.com</Text>
            </View>
          </View>
          
          <View style={[styles.row, { marginTop: 24 }]}>
            <Phone size={24} color="#0047AB" />
            <View style={styles.textContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <Text style={styles.value}>+45 12 34 56 78</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Our support team is available Monday to Friday, 9:00 - 17:00.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    padding: 20,
    marginTop: 10,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 16,
  },
  label: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  footer: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
});
