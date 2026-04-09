import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { Button } from '../components/Button';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { saveProfile } from '../services/userProfile';
import { Profile, UserData, Visa, Record } from '../logic/types';
import { useTheme } from '../context/ThemeContext';

export const LoginScreen = ({ navigation }: any) => {
  const { colors, isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [cprNumber, setCprNumber] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [citizenship, setCitizenship] = useState('Dansk');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Fejl', 'Indtast venligst både e-mail og adgangskode');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigation.replace('MainTabs');
    } catch (error: any) {
      console.error(error);
      let errorMessage = 'Kunne ikke logge ind. Tjek venligst dine oplysninger.';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        errorMessage = 'Ugyldig e-mail eller adgangskode.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Ugyldig e-mailformat.';
      }
      Alert.alert('Login fejl', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!email || !password || !firstName || !surname || !dateOfBirth || !cprNumber || !passportNumber || !citizenship || !phoneNumber) {
      Alert.alert('Fejl', 'Udfyld venligst alle pasoplysninger og kontodetaljer.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Fejl', 'Adgangskoden skal være på mindst 6 tegn');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const uid = userCredential.user.uid;
      
      const now = new Date();
      const validFromDate = now.toLocaleDateString('da-DK');
      const future = new Date(now.getFullYear() + 10, now.getMonth(), now.getDate());
      const validUntilDate = future.toLocaleDateString('da-DK');

      // Random date for initial record
      const randomDays = Math.floor(Math.random() * 30);
      const departureDate = new Date();
      departureDate.setDate(now.getDate() + randomDays);
      const departureDateStr = departureDate.toLocaleDateString('da-DK');

      const defaultVisa: Visa = {
        id: 'default-visa',
        country: citizenship, // Use user's citizenship for the visa country
        flag: citizenship === 'Dansk' ? '🇩🇰' : '🌍', // Basic mapping
        startDate: validFromDate,
        endDate: validUntilDate,
        status: 'ACTIVE',
        statusColor: 'green'
      };

      const defaultRecord: Record = {
        id: 'default-record',
        country: 'Danmark',
        flag: '🇩🇰',
        airport: 'Danske Lufthavne',
        date: departureDateStr,
        type: 'Departure',
        status: 'ACTIVE'
      };

      // Create full profile during signup
      const fullProfile: UserData = {
        firstName,
        surname,
        dateOfBirth,
        cprNumber,
        passportNumber,
        citizenship,
        validFrom: validFromDate,
        validUntil: validUntilDate,
        passportType: 'P',
        countryCode: 'DNK',
        passportStatus: 'ACTIVE',
        email: email.trim(),
        phoneNumber,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        visas: [defaultVisa],
        records: [defaultRecord]
      };
      
      await saveProfile(uid, fullProfile);

      Alert.alert('Succes', 'Konto oprettet korrekt!');
      navigation.replace('MainTabs');
    } catch (error: any) {
      console.error(error);
      let errorMessage = 'Kunne ikke oprette konto.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Denne e-mail er allerede i brug.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Ugyldig e-mailformat.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Adgangskoden er for svag.';
      }
      Alert.alert('Registreringsfejl', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {isRegistering && (
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => setIsRegistering(false)}
          disabled={loading}
        >
          <Text style={[styles.backButtonText, { color: colors.primary }]}>← Tilbage til Login</Text>
        </TouchableOpacity>
      )}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inner}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.logoContainer}>
            <View style={[styles.logoCircle, { backgroundColor: colors.primary }]}>
               <Text style={styles.logoText}>RP</Text>
            </View>
            <Text style={[styles.appName, { color: colors.primary }]}>Rejsepas</Text>
            <Text style={[styles.tagline, { color: colors.secondaryText }]}>Din rejseledsager</Text>
          </View>

          <View style={styles.form}>
            {isRegistering && (
              <>
                <Text style={[styles.sectionHeader, { color: colors.primary }]}>Pasoplysninger</Text>
                
                <Text style={[styles.label, { color: colors.text }]}>Fornavn</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.input, borderColor: colors.inputBorder, color: colors.text }]}
                  placeholder="John"
                  placeholderTextColor={colors.secondaryText}
                  value={firstName}
                  onChangeText={setFirstName}
                  editable={!loading}
                />

                <Text style={[styles.label, { color: colors.text }]}>Efternavn</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.input, borderColor: colors.inputBorder, color: colors.text }]}
                  placeholder="Doe"
                  placeholderTextColor={colors.secondaryText}
                  value={surname}
                  onChangeText={setSurname}
                  editable={!loading}
                />

                <View style={styles.row}>
                  <View style={styles.flex1}>
                    <Text style={[styles.label, { color: colors.text }]}>Fødselsdato</Text>
                    <TextInput
                      style={[styles.input, { backgroundColor: colors.input, borderColor: colors.inputBorder, color: colors.text }]}
                      placeholder="01/01/1990"
                      placeholderTextColor={colors.secondaryText}
                      value={dateOfBirth}
                      onChangeText={setDateOfBirth}
                      editable={!loading}
                    />
                  </View>
                  <View style={[styles.flex1, { marginLeft: 12 }]}>
                    <Text style={[styles.label, { color: colors.text }]}>CPR nr.</Text>
                    <TextInput
                      style={[styles.input, { backgroundColor: colors.input, borderColor: colors.inputBorder, color: colors.text }]}
                      placeholder="010190-1234"
                      placeholderTextColor={colors.secondaryText}
                      value={cprNumber}
                      onChangeText={setCprNumber}
                      editable={!loading}
                    />
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={styles.flex1}>
                    <Text style={[styles.label, { color: colors.text }]}>Pas nr.</Text>
                    <TextInput
                      style={[styles.input, { backgroundColor: colors.input, borderColor: colors.inputBorder, color: colors.text }]}
                      placeholder="DK12345678"
                      placeholderTextColor={colors.secondaryText}
                      value={passportNumber}
                      onChangeText={setPassportNumber}
                      editable={!loading}
                    />
                  </View>
                  <View style={[styles.flex1, { marginLeft: 12 }]}>
                    <Text style={[styles.label, { color: colors.text }]}>Nationalitet</Text>
                    <TextInput
                      style={[styles.input, { backgroundColor: colors.input, borderColor: colors.inputBorder, color: colors.text }]}
                      placeholder="Dansk"
                      placeholderTextColor={colors.secondaryText}
                      value={citizenship}
                      onChangeText={setCitizenship}
                      editable={!loading}
                    />
                  </View>
                </View>

                <Text style={[styles.label, { color: colors.text }]}>Telefonnummer</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.input, borderColor: colors.inputBorder, color: colors.text }]}
                  placeholder="+45 12 34 56 78"
                  placeholderTextColor={colors.secondaryText}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  editable={!loading}
                />

                <Text style={[styles.sectionHeader, { color: colors.primary }]}>Kontodetaljer</Text>
              </>
            )}

            <Text style={[styles.label, { color: colors.text }]}>E-mailadresse</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.input, borderColor: colors.inputBorder, color: colors.text }]}
              placeholder="eksempel@email.com"
              placeholderTextColor={colors.secondaryText}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />

            <Text style={[styles.label, { color: colors.text }]}>Adgangskode</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.input, borderColor: colors.inputBorder, color: colors.text }]}
              placeholder="********"
              placeholderTextColor={colors.secondaryText}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
            />

            <Button 
              title={isRegistering ? "Opret konto" : "Log ind"} 
              onPress={isRegistering ? handleRegister : handleLogin} 
              style={styles.loginBtn}
              loading={loading}
            />
            
            <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)} disabled={loading}>
              <Text style={[styles.toggleText, { color: colors.secondaryText }]}>
                {isRegistering ? "Har du allerede en konto? Log ind" : "Har du ikke en konto? Tilmeld dig"}
              </Text>
            </TouchableOpacity>

            {!isRegistering && <Text style={[styles.forgot, { color: colors.primary }]}>Glemt adgangskode?</Text>}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#0047AB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '800',
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0047AB',
  },
  tagline: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  loginBtn: {
    marginTop: 16,
  },
  toggleText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
    fontSize: 14,
  },
  forgot: {
    textAlign: 'center',
    marginTop: 16,
    color: '#0047AB',
    fontWeight: '500',
  },
  scrollContent: {
    paddingVertical: 40,
  },
  backButton: {
    padding: 16,
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 10,
    left: 10,
    zIndex: 10,
  },
  backButtonText: {
    color: '#0047AB',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0047AB',
    marginTop: 24,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
  },
  flex1: {
    flex: 1,
  },
});
