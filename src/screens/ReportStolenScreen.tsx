import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TextInput } from 'react-native';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/Button';
import { Shield } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';

export const ReportStolenScreen = ({ navigation }: any) => {
  const { colors, isDark } = useTheme();
  const [passportNumber, setPassportNumber] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!passportNumber || !reason) {
      Alert.alert('Fejl', 'Udfyld venligst alle felter.');
      return;
    }

    Alert.alert(
      'Bekræft anmeldelse',
      'Er du sikker på, at du vil anmelde dit pas som stjålet? Dette vil deaktivere dit digitale pas med det samme.',
      [
        { text: 'Annuller', style: 'cancel' },
        { 
          text: 'Anmeld', 
          style: 'destructive',
          onPress: () => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              Alert.alert('Succes', 'Dit pas er blevet anmeldt som stjålet og er nu deaktiveret.', [
                { text: 'OK', onPress: () => navigation.goBack() }
              ]);
            }, 1500);
          }
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Navbar title="Anmeld stjålet pas" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={[styles.iconCircle, { backgroundColor: isDark ? colors.card : '#FFE5E5' }]}>
            <Shield size={40} color={colors.danger} />
          </View>
          <Text style={[styles.title, { color: colors.text }]}>Har du mistet dit pas?</Text>
          <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
            Hvis dit fysiske pas er blevet stjålet eller væk, skal du anmelde det her for at beskytte din identitet.
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={[styles.label, { color: colors.text }]}>Pasnummer</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.input, borderColor: colors.inputBorder, color: colors.text }]}
            placeholder="DK12345678"
            placeholderTextColor={colors.secondaryText}
            value={passportNumber}
            onChangeText={setPassportNumber}
            autoCapitalize="characters"
          />

          <Text style={[styles.label, { color: colors.text }]}>Beskrivelse af hændelsen</Text>
          <TextInput
            style={[styles.input, styles.textArea, { backgroundColor: colors.input, borderColor: colors.inputBorder, color: colors.text }]}
            placeholder="Beskriv kort hvad der er sket..."
            placeholderTextColor={colors.secondaryText}
            multiline
            numberOfLines={4}
            value={reason}
            onChangeText={setReason}
          />

          <Button 
            title="Anmeld som stjålet" 
            variant="danger" 
            onPress={handleSubmit} 
            loading={loading}
          />
        </View>

        <View style={[styles.note, { backgroundColor: isDark ? colors.card : '#FFFBE6', borderColor: isDark ? colors.border : '#FFE58F' }]}>
          <Text style={[styles.noteText, { color: isDark ? colors.secondaryText : '#856404' }]}>
            Bemærk: Når du anmelder dit pas som stjålet, vil det digitale pas blive markeret som 'INAKTIVT' i alle systemer. Du skal kontakte Borgerservice for at få udstedt et nyt pas.
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
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFE5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
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
    backgroundColor: '#FFF',
    padding: 14,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  note: {
    marginTop: 32,
    padding: 16,
    backgroundColor: '#FFFBE6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFE58F',
  },
  noteText: {
    fontSize: 13,
    color: '#856404',
    lineHeight: 18,
    fontStyle: 'italic',
  },
});
