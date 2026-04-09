import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, Alert, Modal, TouchableOpacity, Platform } from 'react-native';
import { Navbar } from '../components/Navbar';
import { Mail, Phone, Edit2, Check, X } from 'lucide-react-native';
import { useUserProfile } from '../hooks/useUserProfile';
import { useTheme } from '../context/ThemeContext';
import { Button } from '../components/Button';
import { updateProfile, updateUserEmail } from '../services/userProfile';

export const ContactInfoScreen = ({ navigation }: any) => {
  const { profile, loading: profileLoading } = useUserProfile();
  const { colors, isDark } = useTheme();
  
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Re-auth state
  const [showReauth, setShowReauth] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (profile) {
      setEmail(profile.email || '');
      setPhoneNumber(profile.phoneNumber || '');
    }
  }, [profile]);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleSave = async (reauthPassword?: string) => {
    if (!validateEmail(email)) {
      showAlert('Fejl', 'Indtast venligst en gyldig e-mailadresse');
      return;
    }

    setLoading(true);
    try {
      const { auth } = require('../firebaseConfig');
      const uid = auth.currentUser?.uid;
      if (!uid) throw new Error('Ingen bruger logget ind');

      // 1. Update Email (Auth + Firestore)
      if (email !== profile?.email) {
        try {
          await updateUserEmail(email, reauthPassword);
        } catch (error: any) {
          if (error.code === 'auth/requires-recent-login') {
            setShowReauth(true);
            setLoading(false);
            return;
          }
          throw error;
        }
      }

      // 2. Update Phone Number (Firestore)
      if (phoneNumber !== profile?.phoneNumber) {
        await updateProfile(uid, { phoneNumber });
      }

      showAlert('Succes', 'Dine kontaktoplysninger er blevet opdateret.');
      setIsEditing(false);
      setShowReauth(false);
      setPassword('');
    } catch (error: any) {
      console.error(error);
      showAlert('Fejl', 'Kunne ikke opdatere oplysninger. ' + (error.message || ''));
    } finally {
      setLoading(false);
    }
  };

  if (profileLoading && !profile) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Navbar title="Kontaktinformation" onBack={() => navigation.goBack()} />
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </View>
    );
  }

  const fallback = "Ikke angivet";

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Navbar title="Kontaktinformation" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Dine oplysninger</Text>
            {!isEditing && (
              <TouchableOpacity onPress={() => setIsEditing(true)}>
                <Edit2 size={20} color={colors.primary} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.row}>
            <Mail size={24} color={colors.primary} />
            <View style={styles.textContainer}>
              <Text style={[styles.label, { color: colors.secondaryText }]}>E-mailadresse</Text>
              {isEditing ? (
                <TextInput
                  style={[styles.input, { backgroundColor: colors.input, borderColor: colors.inputBorder, color: colors.text }]}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder="eksempel@email.com"
                  placeholderTextColor={colors.secondaryText}
                />
              ) : (
                <Text style={[styles.value, { color: colors.text }]}>{profile?.email || fallback}</Text>
              )}
            </View>
          </View>
          
          <View style={[styles.row, { marginTop: isEditing ? 8 : 24 }]}>
            <Phone size={24} color={colors.primary} />
            <View style={styles.textContainer}>
              <Text style={[styles.label, { color: colors.secondaryText }]}>Telefonnummer</Text>
              {isEditing ? (
                <TextInput
                  style={[styles.input, { backgroundColor: colors.input, borderColor: colors.inputBorder, color: colors.text }]}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  placeholder="+45 12 34 56 78"
                  placeholderTextColor={colors.secondaryText}
                />
              ) : (
                <Text style={[styles.value, { color: colors.text }]}>{profile?.phoneNumber || fallback}</Text>
              )}
            </View>
          </View>

          {isEditing && (
            <View style={styles.editActions}>
              <Button 
                title="Annuller" 
                variant="secondary" 
                onPress={() => {
                  setIsEditing(false);
                  setEmail(profile?.email || '');
                  setPhoneNumber(profile?.phoneNumber || '');
                }} 
                style={styles.actionBtn}
                disabled={loading}
              />
              <Button 
                title="Gem ændringer" 
                onPress={() => handleSave()} 
                style={styles.actionBtn}
                loading={loading}
              />
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.secondaryText }]}>
            Dine kontaktoplysninger bruges til rejsemeddelelser og sikkerhedsbekræftelse.
          </Text>
        </View>
      </View>

      {/* Re-authentication Modal */}
      <Modal visible={showReauth} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Bekræft login</Text>
            <Text style={[styles.modalText, { color: colors.secondaryText }]}>
              For at ændre din e-mailadresse skal du bekræfte din adgangskode.
            </Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.input, borderColor: colors.inputBorder, color: colors.text }]}
              placeholder="Adgangskode"
              placeholderTextColor={colors.secondaryText}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <View style={styles.modalActions}>
              <Button 
                title="Annuller" 
                variant="secondary" 
                onPress={() => setShowReauth(false)} 
                style={styles.modalBtn}
              />
              <Button 
                title="Bekræft" 
                onPress={() => handleSave(password)} 
                style={styles.modalBtn}
                loading={loading}
              />
            </View>
          </View>
        </View>
      </Modal>
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 16,
    flex: 1,
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
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginTop: 4,
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  actionBtn: {
    flex: 0.48,
    marginVertical: 0,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalBtn: {
    flex: 0.48,
  },
});
