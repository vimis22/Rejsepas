import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Navbar } from '../components/Navbar';
import { Mail, Phone } from 'lucide-react-native';
import { useUserProfile } from '../hooks/useUserProfile';

export const ContactInfoScreen = ({ navigation }: any) => {
  const { profile, loading } = useUserProfile();

  if (loading) {
    return (
      <View style={styles.container}>
        <Navbar title="Contact Info" onBack={() => navigation.goBack()} />
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0047AB" />
        </View>
      </View>
    );
  }

  const fallback = "Ikke angivet";

  return (
    <View style={styles.container}>
      <Navbar title="Contact Info" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.row}>
            <Mail size={24} color="#0047AB" />
            <View style={styles.textContainer}>
              <Text style={styles.label}>Email Address</Text>
              <Text style={styles.value}>{profile?.email || fallback}</Text>
            </View>
          </View>
          
          <View style={[styles.row, { marginTop: 24 }]}>
            <Phone size={24} color="#0047AB" />
            <View style={styles.textContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <Text style={styles.value}>{profile?.phoneNumber || fallback}</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Your contact information is used for travel notifications and security verification.
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
