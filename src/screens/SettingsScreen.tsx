import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Navbar } from '../components/Navbar';
import { ChevronRight, Shield, Info, Phone, LogOut, Moon } from 'lucide-react-native';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

export const SettingsScreen = ({ navigation }: any) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Navigation will be handled by App.tsx onAuthStateChanged
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to log out');
    }
  };

  return (
    <View style={styles.container}>
      <Navbar title="Settings" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <SettingItem icon={<Moon size={22} color="#555" />} label="Theme" value="Light" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <SettingItem 
            icon={<Phone size={22} color="#555" />} 
            label="Contact Information" 
            onPress={() => navigation.navigate('ContactInfo')} 
          />
          <SettingItem icon={<Info size={22} color="#555" />} label="Terms & Conditions" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          <TouchableOpacity style={styles.dangerItem}>
            <Shield size={22} color="#FF3B30" />
            <Text style={styles.dangerText}>Report Stolen Passport</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <LogOut size={22} color="#666" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const SettingItem = ({ icon, label, value, onPress }: any) => (
  <TouchableOpacity style={styles.item} onPress={onPress} disabled={!onPress}>
    <View style={styles.itemLeft}>
      {icon}
      <Text style={styles.itemLabel}>{label}</Text>
    </View>
    <View style={styles.itemRight}>
      {value && <Text style={styles.itemValue}>{value}</Text>}
      <ChevronRight size={20} color="#CCC" />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#888',
    textTransform: 'uppercase',
    marginBottom: 12,
    marginLeft: 4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLabel: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
    fontWeight: '500',
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemValue: {
    fontSize: 14,
    color: '#999',
    marginRight: 8,
  },
  dangerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFD6D6',
  },
  dangerText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#FF3B30',
    fontWeight: '600',
  },
  logoutContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  logoutText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
    fontWeight: '600',
  },
});
