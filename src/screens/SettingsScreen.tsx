import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Navbar } from '../components/Navbar';
import { ChevronRight, Shield, Info, Phone, LogOut, Moon, Sun } from 'lucide-react-native';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useTheme } from '../context/ThemeContext';

export const SettingsScreen = ({ navigation }: any) => {
  const { colors, theme, toggleTheme, isDark } = useTheme();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Navigation will be handled by App.tsx onAuthStateChanged
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to log out');
    }
  };

  const handleNavigation = (screenName: string) => {
    console.log(`Navigating to ${screenName}`);
    navigation.navigate(screenName);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Navbar title="Indstillinger" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.secondaryText }]}>Præferencer</Text>
          <SettingItem 
            icon={isDark ? <Sun size={22} color={colors.secondaryText} /> : <Moon size={22} color={colors.secondaryText} />} 
            label="Tema" 
            value={theme === 'light' ? 'Lyst' : 'Mørkt'} 
            onPress={toggleTheme}
            colors={colors}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.secondaryText }]}>Support</Text>
          <SettingItem 
            icon={<Phone size={22} color={colors.secondaryText} />} 
            label="Kontaktinformation" 
            onPress={() => handleNavigation('ContactInfo')} 
            colors={colors}
          />
          <SettingItem 
            icon={<Info size={22} color={colors.secondaryText} />} 
            label="Handelsbetingelser" 
            onPress={() => handleNavigation('Terms')}
            colors={colors}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.secondaryText }]}>Sikkerhed</Text>
          <TouchableOpacity 
            style={[styles.dangerItem, { backgroundColor: colors.card, borderColor: isDark ? colors.danger : '#FFD6D6' }]} 
            onPress={() => handleNavigation('ReportStolen')}
          >
            <Shield size={22} color={colors.danger} />
            <Text style={[styles.dangerText, { color: colors.danger }]}>Anmeld stjålet pas</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <LogOut size={22} color={colors.secondaryText} />
            <Text style={[styles.logoutText, { color: colors.secondaryText }]}>Log ud</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const SettingItem = ({ icon, label, value, onPress, colors }: any) => {
  return (
    <TouchableOpacity 
      style={[styles.item, { backgroundColor: colors.card }]} 
      onPress={onPress} 
      activeOpacity={0.7}
    >
      <View style={styles.itemLeft}>
        {icon}
        <Text style={[styles.itemLabel, { color: colors.text }]}>{label}</Text>
      </View>
      <View style={styles.itemRight}>
        {value && <Text style={[styles.itemValue, { color: colors.secondaryText }]}>{value}</Text>}
        <ChevronRight size={20} color={colors.border} />
      </View>
    </TouchableOpacity>
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
