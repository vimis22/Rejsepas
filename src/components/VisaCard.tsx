import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface VisaCardProps {
  country: string;
  flag: string;
  startDate: string;
  endDate: string;
  status: string;
}

export const VisaCard: React.FC<VisaCardProps> = ({ country, flag, startDate, endDate, status }) => {
  const { colors } = useTheme();

  const getStatusColor = () => {
    if (status === 'ACTIVE' || status === 'VALID' || status === 'Active') return '#4CD964';
    switch (status) {
      case 'Expired': return '#FF3B30';
      default: return '#FFCC00';
    }
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <View style={styles.header}>
        <Text style={styles.flag}>{flag}</Text>
        <Text style={[styles.country, { color: colors.text }]}>{country}</Text>
        <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
      </View>
      <View style={styles.details}>
        <View>
          <Text style={[styles.label, { color: colors.secondaryText }]}>Start Date</Text>
          <Text style={[styles.value, { color: colors.text }]}>{startDate}</Text>
        </View>
        <View>
          <Text style={[styles.label, { color: colors.secondaryText }]}>End Date</Text>
          <Text style={[styles.value, { color: colors.text }]}>{endDate}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  flag: {
    fontSize: 24,
    marginRight: 10,
  },
  country: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
  },
});
