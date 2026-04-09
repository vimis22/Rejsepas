import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Navbar } from '../components/Navbar';
import { CreditCard } from 'lucide-react-native';
import { useUserProfile } from '../hooks/useUserProfile';
import { useTheme } from '../context/ThemeContext';

export const PassportScreen = () => {
  const { profile, loading, error } = useUserProfile();
  const { colors } = useTheme();

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Navbar title="Pasdetaljer" />
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </View>
    );
  }

  const fallback = "Ikke angivet";

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Navbar title="Pasdetaljer" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.passportCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>DANMARK / DENMARK</Text>
            <CreditCard size={24} color="#FFF" />
          </View>
          
          <View style={styles.cardBody}>
            <View style={styles.row}>
              <InfoBlock label="Type" value={profile?.passportType || "P"} />
              <InfoBlock label="Kode / Code" value={profile?.countryCode || "DNK"} />
              <InfoBlock label="Pas nr. / Passport No." value={profile?.passportNumber || fallback} />
            </View>

            <View style={styles.row}>
              <InfoBlock label="Efternavn / Surname" value={profile?.surname || fallback} />
            </View>

            <View style={styles.row}>
              <InfoBlock label="Fornavne / Given Names" value={profile?.firstName || fallback} />
            </View>

            <View style={styles.row}>
              <InfoBlock label="Nationalitet / Nationality" value={profile?.citizenship || fallback} />
            </View>

            <View style={styles.row}>
              <InfoBlock label="Fødselsdato / Date of birth" value={profile?.dateOfBirth || fallback} />
              <InfoBlock label="CPR nr. / Personal ID" value={profile?.cprNumber || fallback} />
            </View>

            <View style={styles.row}>
              <InfoBlock label="Udstedt den / Date of issue" value={profile?.validFrom || fallback} />
              <InfoBlock label="Udløber den / Date of expiry" value={profile?.validUntil || fallback} />
            </View>
          </View>
        </View>

        <View style={styles.statusSection}>
          <Text style={[styles.statusTitle, { color: colors.text }]}>Passport Status</Text>
          <View style={[styles.statusBadge, { backgroundColor: '#E1F5E1', borderColor: '#A5D6A7' }]}>
            <Text style={styles.statusText}>
              {profile?.passportStatus === 'ACTIVE' ? "AKTIV / ACTIVE" : (profile?.passportStatus || fallback)}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const InfoBlock = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.infoBlock}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    padding: 20,
  },
  passportCard: {
    backgroundColor: '#8B0000', // Deep red for Danish passport
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  cardHeader: {
    backgroundColor: '#660000',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },
  cardBody: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoBlock: {
    flex: 1,
  },
  infoLabel: {
    color: '#FFCCCC',
    fontSize: 10,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  infoValue: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  statusSection: {
    marginTop: 30,
    alignItems: 'center',
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  statusBadge: {
    backgroundColor: '#E1F5E1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#A5D6A7',
  },
  statusText: {
    color: '#2E7D32',
    fontWeight: '700',
    fontSize: 14,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
});
