import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Navbar } from '../components/Navbar';
import { useTheme } from '../context/ThemeContext';

export const TermsScreen = ({ navigation }: any) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Navbar title="Handelsbetingelser" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, { color: colors.text }]}>Vilkår og betingelser</Text>
        <Text style={[styles.date, { color: colors.secondaryText }]}>Sidst opdateret: 9. april 2026</Text>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>1. Generelt</Text>
          <Text style={[styles.text, { color: colors.text }]}>
            Ved at bruge Rejsepas appen accepterer du disse vilkår og betingelser. Appen er designet til at give dig adgang til dine digitale pasoplysninger, visa og rejsehistorik.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>2. Privatliv og datasikkerhed</Text>
          <Text style={[styles.text, { color: colors.text }]}>
            Dine data opbevares sikkert i Firebase Firestore. Vi gemmer kun de oplysninger, du selv indtaster under oprettelsen af din konto, samt de rejseoplysninger, der genereres automatisk.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>3. Brugeransvar</Text>
          <Text style={[styles.text, { color: colors.text }]}>
            Det er dit ansvar at sikre, at dine loginoplysninger er beskyttet. Hvis du mister dit pas eller mistænker misbrug, skal du straks anmelde det via appen eller kontakte de relevante myndigheder.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Ændringer</Text>
          <Text style={styles.text}>
            Vi forbeholder os retten til at ændre disse betingelser til enhver tid. Ændringer vil blive meddelt via appen.
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
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0047AB',
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
});
