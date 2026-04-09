import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Navbar } from '../components/Navbar';
import { User } from 'lucide-react-native';
import { auth, db } from '../firebaseConfig';
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import { Profile } from '../logic/types';

export const HomeScreen = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    const docRef = doc(db, 'users', user.uid);

    // Initial check to see if document exists, if not create default
    const checkAndCreateDefault = async () => {
      try {
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          const defaultProfile: Profile = {
            firstName: 'Traveler',
            surname: 'User',
            dateOfBirth: '01/01/1990',
            cprNumber: '010190-0000',
            passportStartDate: '01/01/2024',
            passportEndDate: '01/01/2034',
            country: 'Denmark',
            flag: '🇩🇰',
            passportNumber: 'DK00000000',
          };
          await setDoc(docRef, defaultProfile);
        }
      } catch (err: any) {
        console.error("Error checking/creating profile:", err);
        setError("Failed to initialize profile.");
      }
    };

    checkAndCreateDefault();

    // Listen for changes
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setProfile(snapshot.data() as Profile);
        setError(null);
      }
      setLoading(false);
    }, (err) => {
      console.error("Firestore error:", err);
      setError("Failed to load profile data.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Navbar title="My Profile" />
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0047AB" />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </View>
    );
  }

  if (error || !profile) {
    return (
      <View style={styles.container}>
        <Navbar title="My Profile" />
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error || "Profile not found"}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Navbar title="My Profile" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarCircle}>
             <User size={60} color="#0047AB" />
          </View>
          <Text style={styles.userName}>{profile.firstName} {profile.surname}</Text>
          <Text style={styles.countryLabel}>{profile.country} Citizen {profile.flag}</Text>
        </View>

        <View style={styles.detailsCard}>
          <DetailRow label="First Name" value={profile.firstName} />
          <DetailRow label="Surname" value={profile.surname} />
          <DetailRow label="Date of Birth" value={profile.dateOfBirth} />
          <DetailRow label="CPR Number" value={profile.cprNumber} />
          <DetailRow label="Valid From" value={profile.passportStartDate} />
          <DetailRow label="Valid Until" value={profile.passportEndDate} />
        </View>
      </ScrollView>
    </View>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  errorText: {
    color: '#FF3B30',
    textAlign: 'center',
    fontSize: 16,
  },
  scrollContent: {
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 10,
  },
  avatarCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 4,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  countryLabel: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  detailsCard: {
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
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  rowLabel: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
  },
  rowValue: {
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
  },
});
